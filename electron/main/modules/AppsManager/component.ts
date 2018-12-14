import * as path from 'path';
import { BrowserWindow } from 'electron';

import { RendererConf, globalUUIDList } from '../../helpers/constants/globalVariables';
import { dappsPath } from '../../helpers/constants/appPaths';
import { DappFrame } from '../../helpers/systemComponents/DappFrame';
import PermissionManager from '../../helpers/systemComponents/PermissionManager';
import StoreManager from '../../helpers/systemComponents/StoreManager';
import { component as IpfsStorage } from '../IpfsStorage';
import { component as FileManager } from '../FileManager';

import * as actions from './actions';
import * as constants from './constants';
import { AppItem, ReadyDapp } from './models';
import { readDir, readFile, createDappView } from './utils';
import { component as Dapp } from '../Dapp';
import { all } from 'async';

const installedDapps: AppItem[] = [];
const allDapps: DappDownloadEntity[] = [];

export type DappDownloadEntity = {
  hash: string;
  appName: string;
  preview?: string;
  categories?: string[];
  permissions?: string[];
};

class AppsProvider {
  static requestAllDappsList(): DappDownloadEntity[] {
    return [{
      hash: 'QmP2yvt4NBqUqgrep85Y6NpRFLfwAsx2xdoZdbQTapYswE',
      appName: 'BlockExplorer',
      categories: [],
    }];
  }
}

export default class AppsManager {
  id: number;
  icon: string;
  permissions: any[];
  static readyDapps: ReadyDapp[] = [];

  static getAppItem(appName: string) {
    const targetDapp = AppsManager.installedDapps.find((item: AppItem) => item.appName === appName);
    const randomKey = Math.floor(Math.random() * 1000);

    return Object.assign({}, targetDapp, {
      id: randomKey,
      statusIcon: ['running'], // @todo add icon resolve
    });
  }

  static get installedDapps() {
    return installedDapps;
  }

  static get allDapps() {
    return allDapps;
  }

  static resolvePath(item: AppItem) {
    const icon = path.join(constants.DAPPS_PATH, item.appName, item.icon).replace(/\\/g, "/");
    const preview = path.join(constants.DAPPS_PATH, item.appName, item.preview).replace(/\\/g, "/");
    return { ...item, icon, preview };
  }

  static async getAllDapps() {
    const allDappsList = AppsProvider.requestAllDappsList();
    await AppsManager.parseDapps();
    console.log('INSTALLED DAPPS', installedDapps);

    return allDappsList.map((dapp) => ({
      ...dapp,
      installed: !!AppsManager.getInstalledDappItem(dapp.appName),
    }));
  }

  // Get dapp item by name case insensitive
  static getInstalledDappItem(dappName: string = ''): AppItem {
    return AppsManager.installedDapps.find(dappObj => dappObj.appName && dappObj.appName.toLowerCase() === dappName.toLowerCase());
  }

  static getDappItemByName(dappName: string = '') {
    return AppsManager.allDapps.find((dapp) => dapp.appName === dappName);
  }

  static async installDapp(dappName: string, hash: string) {
    const dapp = AppsManager.getInstalledDappItem(dappName);

    if (!dapp) {
      return;
    }
    await AppsManager.downloadDapp(hash);
  }

  static async downloadDapp(hash: string) {
    const dappFolder = await IpfsStorage.downloadFolder(hash);
    await FileManager.saveFolder(dappsPath, dappFolder);
    console.log('DOWNLOAD_DAPP', dappFolder);
  }

  static async parseDapps() {
    try {
      const dappsFolders: string[] = await readDir(dappsPath);

      const promises = dappsFolders.map(folder => AppsManager.parseDapp(folder)); // @todo rewrite with async lib
      return await Promise.all(promises);

    } catch (err) {
      console.log('Catched', err);
      return [];
    }
  }

  static async parseDapp(folder: string) {
    try {
      const fileContent = await readFile(path.join(constants.DAPPS_PATH, folder, 'manifest.json'));
      const itemWithResolvedPath = AppsManager.resolvePath(JSON.parse(fileContent));

      AppsManager.installedDapps.push(itemWithResolvedPath);
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
    const dapp = AppsManager.getInstalledDappItem(targetDappName);
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

  static async closeDapp(targetDappName: string) {
    const renderer = AppsManager.getDappRenderer(targetDappName);
    renderer.dappView.destroy();
    const index = globalUUIDList.findIndex(item => item.name === targetDappName && item.status === 'dapp');
    globalUUIDList.splice(index, 1);
  }

  static async openDapp(dappName: string, clientWindow: BrowserWindow) {
    const dapp = AppsManager.getInstalledDappItem(dappName);

    await PermissionManager.checkDappPermissions(dappName, dapp.permissions, clientWindow);
    await AppsManager.createDapp(dappName, clientWindow);
  }
}
