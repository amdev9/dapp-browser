import { AnyAction, Store } from 'redux';
import { BrowserWindow } from 'electron';
import { ofType } from 'redux-observable';

import { IState } from './reducers/state';
import { AppItem, AppsManager } from './AppsManager';
import { createDappView, RendererConf } from '../createDappView';
import { storeObservable } from './epics/appMainEpic';
import * as constants from './constants';
import { createPermissionWindow } from '../createPermissionWindow';
import { DappFrame } from './DappFrame';

export const isProduction = process.env.ELECTRON_ENV !== 'development';

export default class AppMain {
  static store: Store<IState>;
  static globalUUIDList: RendererConf[];
  static clientWindow: Electron.BrowserWindow;
  static isClientWindowLoaded: Promise<void>;
  static permissionWindow: BrowserWindow;

  constructor(store: Store<IState>, globalUUIDList: RendererConf[], clientWindow: Electron.BrowserWindow) {
    if (!store || !globalUUIDList || !clientWindow) {
      throw Error('Arguments must be objects');
    }

    AppMain.store = store;
    AppMain.globalUUIDList = globalUUIDList;
    AppMain.clientWindow = clientWindow;
    AppMain.isClientWindowLoaded = new Promise((resolve, reject) => {
      AppMain.clientWindow.webContents.on('did-finish-load', () => {
        console.log('did-finish-load CLASS');
        resolve();
      });
    });

    AppMain.onSwitchDapp();
    AppMain.onToggleHome();
    AppMain.onClosePermissionManager();
  }

  static onClosePermissionManager() {
    storeObservable
      .pipe(ofType(constants.CLOSE_MANAGER))
      .subscribe(async (action: AnyAction) => {
        AppMain.closeDappPermissionWindow();
      });
  }

  static onToggleHome() {
    storeObservable
      .pipe(ofType(constants.TOGGLE_HOME))
      .subscribe(async (action: AnyAction) => {
        AppMain.clientWindow.setBrowserView(null);
      });
  }

  static onSwitchDapp() {
    storeObservable
      .pipe(ofType(constants.SWITCH_DAPP))
      .subscribe(async (action: AnyAction) => {
        console.log('onSwitchDapp start');
        const { targetDappName } = action.payload;
        const activeDapp = AppMain.getDapp(targetDappName);
        const activeDappRenderer = createDappView(AppMain.globalUUIDList, activeDapp);
        const dappView = activeDappRenderer && activeDappRenderer.dappView || null;
        const state = AppMain.store.getState();

        console.log('onSwitchDapp: dappView', dappView, activeDappRenderer);
        if (!dappView) {
          return;
        }
        console.log('onSwitchDapp: dappCreated', dappView);
        AppMain.clientWindow.setBrowserView(dappView);

        await AppMain.isClientWindowLoaded;
        console.log('onSwitchDapp: isLoadedClientWindow');
        AppMain.openDappPermissionWindow(targetDappName);

        AppMain.correctDappViewBounds();
      });
  }

  static closeDappPermissionWindow() {
    if (AppMain.permissionWindow) {
      AppMain.permissionWindow.close();
      console.log('onSwitchDapp: close permissionManager');
    }
  }

  static openDappPermissionWindow(dappName: string) {
    const activeDapp = AppMain.getDapp(dappName);
    const state = AppMain.store.getState();

    const activeDappGranted = state.permissionManager.grantedApps.includes(dappName);

    console.log('onSwitchDapp: activeDappGranted', activeDappGranted);

    AppMain.closeDappPermissionWindow();

    if (!activeDappGranted) {
      AppMain.permissionWindow = createPermissionWindow(AppMain.globalUUIDList, AppMain.clientWindow, dappName, activeDapp.permissions);
      AppMain.permissionWindow.on('closed', () => {
        AppMain.permissionWindow = null;
      });
    }
  }

  static correctDappViewBounds() {
    const state = AppMain.store.getState();

    const view = AppMain.clientWindow.getBrowserView();
    const windowBounds = AppMain.clientWindow.getBounds();
    if (view) {
      const dappFrame: Electron.Rectangle = new DappFrame(state.client, isProduction ? windowBounds : null);
      view.setBounds(dappFrame);
    }
  }

  static get getActiveDappName() {
    const state = AppMain.store.getState();
    const { activeDapp } = state.client;

    return activeDapp && activeDapp.appName;
  }

  static getDapp(dappName: string) {
    return AppsManager.dapps.find(dappObj => dappObj.appName === dappName);
  }

  static createDappView(dappName: string) {
    const dappObject: AppItem = AppMain.getDapp(dappName);

    if (dappObject) {
      return createDappView(AppMain.globalUUIDList, dappObject);
    }

    return;
  }
}
