import { AnyAction } from 'redux';
import * as Bluebird from 'bluebird';
import * as path from 'path';
import * as fs from 'fs';
import { ofType } from 'redux-observable';

import { DAPPS_PATH } from '../constants/appPaths';
import { RendererConf, globalUUIDList } from '../constants/globalVariables';
import { DappFrame } from './DappFrame';
import { IState } from '../reducers/state';

import { storeObservable } from '../epics/appMainEpic';
import * as constants from '../constants';
import { createDappView } from '../../createDappView';
import { onAction } from '../utils/actionUtils';
import PermissionManager from './PermissionManager';

import BrowserWindow = Electron.BrowserWindow;
import * as actionsDappInterface from '../actions/dappInterface';
import { activeDappSelector } from '../selectors';
import StoreManager from './StoreManager';

export const isProduction = process.env.ELECTRON_ENV !== 'development';

declare global {
  export interface Promise<T> extends Bluebird<T> {
  }

  interface PromiseConstructor {
    delay: typeof Bluebird.prototype.delay;
  }
}

declare const Promise: any;

async function readDir(path: string) {
  return new Promise((res: any, rej: any) => {
    fs.readdir(path, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}

async function readFile(path: string, opts = 'utf8') {
  return new Promise((res: any, rej: any) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}

export type AppItem = {

  id?: number;
  appName: string;
  main: string;
  icon: string;
  statusIcon: string[];
  preview: string;
  permissions: string[]
};

interface ReadyDapp {
  name: string;
  uuid: string;
}

const dappsGlobal: AppItem[] = [];

export class AppsManager {
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
    const icon = path.join(DAPPS_PATH, item.appName, item.icon);
    const preview = path.join(DAPPS_PATH, item.appName, item.preview);
    return { ...item, icon, preview };
  }

  static async parseDapps() {
    try {
      const dappsFolders: string[] = await readDir(DAPPS_PATH);

      const promises = dappsFolders.map(folder => AppsManager.parseDapp(folder)); // @todo rewrite with async lib
      await Promise.all(promises);

    } catch (err) {
      console.log('Catched', err);
    }
  }

  static async parseDapp(folder: string) {
    try {
      const fileContent = await readFile(path.join(DAPPS_PATH, folder, 'manifest.json'));
      const itemWithResolvedPath = AppsManager.resolvePath(JSON.parse(fileContent));
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

  static correctDappViewBounds(clientWindow: BrowserWindow, state: IState): void {
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

  static onDappContentLoaded() {
    storeObservable
      .pipe(ofType(constants.DAPP_CONTENT_LOADED))
      .subscribe(async (action: AnyAction) => {
        AppsManager.addReadyDapp(action.meta.sourceUUID, action.meta.name);
      });
  }

  static setDappFocus(dappUUID: string) {
    StoreManager.store.dispatch(actionsDappInterface.dappSetFocus(dappUUID));
  }

  static resetDappFocus(dappUUID: string) {
    StoreManager.store.dispatch(actionsDappInterface.dappResetFocus(dappUUID));
  }

  static resetDappFocusActiveDapp() {
    const activeDappName = AppsManager.getActiveDappName();

    if (activeDappName) {
      const activeDapp = AppsManager.getDappByName(activeDappName);
      activeDapp && AppsManager.resetDappFocus(activeDapp.id);
    }
  }

  static getDappByName(dappName: string) {
    return globalUUIDList.find(dapp => dapp.name === dappName);
  }

  static getActiveDappName() {
    const state = StoreManager.store.getState();
    return activeDappSelector(state);
  }

  static async createDapp(targetDappName: string, clientWindow: BrowserWindow, state: IState) {
    const dapp = AppsManager.getDappItem(targetDappName);
    const dappRenderer = createDappView(globalUUIDList, dapp);
    const dappView = dappRenderer && dappRenderer.dappView || null;
    const isDappReady = AppsManager.isDappReady(targetDappName);
    const dappReadyPromise = !isDappReady ? onAction(constants.DAPP_CONTENT_LOADED, action => action.meta.sourceUUID === dappRenderer.id) : true;

    AppsManager.resetDappFocusActiveDapp();

    clientWindow.setBrowserView(dappView);

    AppsManager.correctDappViewBounds(clientWindow, state);

    // If dapp DOM hasn't loaded wait for loading dapp
    await dappReadyPromise;
    AppsManager.setDappFocus(dappRenderer.id);
  }

  static async openDapp(dappName: string, clientWindow: BrowserWindow, state: IState) {
    const dapp = AppsManager.getDappItem(dappName);

    await PermissionManager.checkDappPermissions(dappName, dapp.permissions, clientWindow, state);
    await AppsManager.createDapp(dappName, clientWindow, state);
  }
}

AppsManager.onDappContentLoaded();
