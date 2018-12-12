import * as path from 'path';
import { BrowserWindow } from 'electron';

import { RendererConf, globalUUIDList } from '../../helpers/constants/globalVariables';
import { DappFrame } from '../../helpers/systemComponents/DappFrame';
import { activeDappSelector } from './selectors';
import PermissionManager from '../../helpers/systemComponents/PermissionManager';
import StoreManager from '../../helpers/systemComponents/StoreManager';

import * as actions from './actions';
import * as constants from './constants';
import { AppItem, ReadyDapp } from './models';
import { readDir, readFile, createDappView } from './utils';
import { component as Dapp } from '../Dapp';

const dappsGlobal: AppItem[] = [];

export default class AppsManager {
  id: number;
  icon: string;
  permissions: any[];
  static readyDapps: ReadyDapp[] = [];

  static getAppItem(appName: string) {
    const targetDapp = dappsGlobal.find((item: AppItem) => item.appName === appName);
    const randomKey = Math.floor(Math.random() * 1000);

    return Object.assign({}, targetDapp, {
      id: randomKey,
      statusIcon: ['running'], // @todo add icon resolve
    });
  }

  static get dapps() {
    return dappsGlobal;
  }

  static resolvePath(item: AppItem) {
    const icon = path.join(constants.DAPPS_PATH, item.appName, item.icon).replace(/\\/g,"/");
    const preview = path.join(constants.DAPPS_PATH, item.appName, item.preview).replace(/\\/g,"/");
    return { ...item, icon, preview };
  }

  static async parseDapps() {
    try {
      const dappsFolders: string[] = await readDir(constants.DAPPS_PATH);

      const promises = dappsFolders.map(folder => AppsManager.parseDapp(folder)); // @todo rewrite with async lib
      await Promise.all(promises);

    } catch (err) {
      console.log('Catched', err);
    }
  }

  static async parseDapp(folder: string) {
    try {
      const fileContent = await readFile(path.join(constants.DAPPS_PATH, folder, 'manifest.json'));
      const itemWithResolvedPath = AppsManager.resolvePath(JSON.parse(fileContent));
      console.log('PARSE_DAPP', fileContent, itemWithResolvedPath)

      AppsManager.dapps.push(itemWithResolvedPath);
      return itemWithResolvedPath;

    } catch (err) {
      if (err instanceof SyntaxError) {
        console.log('Please check your js syntax: \n'); // @todo put it into console logs
        console.log(err);
      } else {
        console.log('other error: ', err);
      }
    }
  }

  // Get dapp item by name case insensitive
  static getDappItem(dappName: string = ''): AppItem {
    return AppsManager.dapps.find(dappObj => dappObj.appName && dappObj.appName.toLowerCase() === dappName.toLowerCase());
  }

  static getDappRenderer(dappName: string = ''): RendererConf {
    return globalUUIDList.find(item => item.name === dappName && item.status === 'dapp');
  }

  static correctDappViewBounds(clientWindow: BrowserWindow): void {
    const state = StoreManager.store.getState();
    const view = clientWindow.getBrowserView();
    const windowBounds = clientWindow.getBounds();
    if (view) {
      const dappFrame: Electron.Rectangle = new DappFrame(state.client, windowBounds);
      view.setBounds(dappFrame);
    }
  }

  // Find ready dapp name without case sensitive
  static isDappReady(dappName: string = ''): ReadyDapp {
    return AppsManager.readyDapps.find((dapp: ReadyDapp) => dapp.name.toLowerCase() === dappName.toLowerCase());
  }

  static addReadyDapp(sourceUUID: string, name: string): void {
    AppsManager.readyDapps.push({ name, uuid: sourceUUID });
  }

  static async createDapp(targetDappName: string, clientWindow: BrowserWindow) {
    const dapp = AppsManager.getDappItem(targetDappName);
    const dappRenderer = createDappView(globalUUIDList, dapp);
    const dappView = dappRenderer && dappRenderer.dappView || null;
    const isDappReady = AppsManager.isDappReady(targetDappName);
    const dappReadyPromise = !isDappReady ? StoreManager.onAction(constants.DAPP_CONTENT_LOADED, action => action.meta.sourceUUID === dappRenderer.id) : true;

    const activeDapp = Dapp.getActiveDapp();
    if (activeDapp) {
      activeDapp.resetDappFocus();
    }

    clientWindow.setBrowserView(dappView);

    AppsManager.correctDappViewBounds(clientWindow);

    // Waiting for loading DOM of dapp
    await dappReadyPromise;
    const createdDapp = new Dapp(dappRenderer.id);
    createdDapp.setDappFocus();
  }

  static async openDapp(dappName: string, clientWindow: BrowserWindow) {
    const dapp = AppsManager.getDappItem(dappName);

    await PermissionManager.checkDappPermissions(dappName, dapp.permissions, clientWindow);
    await AppsManager.createDapp(dappName, clientWindow);
  }
}
