import { AnyAction, Store } from 'redux';
import { BrowserWindow } from 'electron';
import { ofType } from 'redux-observable';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { createSelector } from 'reselect';

import { IState } from './reducers/state';
import * as clientActions from './actions/client';
import { AppItem, AppsManager } from './AppsManager';
import { createDappView, RendererConf } from '../createDappView';
import { storeObservable } from './epics/appMainEpic';
import * as constants from './constants';
import { createPermissionWindow } from '../createPermissionWindow';
import { DappFrame } from './DappFrame';
import { constant } from "async";

export const isProduction = process.env.ELECTRON_ENV !== 'development';

const activeDappSelector = createSelector(
  (state: IState) => state.client.activeDapp,
  activeDapp => activeDapp && activeDapp.appName && activeDapp.appName.toLowerCase(),
);

interface Dapp {
  name: string;
  uuid: string;
}

interface ActionFlow {
  successType: string;
  failureType: string;
}

export default class AppMain {
  static store: Store<IState>;
  static globalUUIDList: RendererConf[];
  static clientWindow: Electron.BrowserWindow;
  static isClientWindowLoaded: Promise<void>;
  static permissionWindow: BrowserWindow;
  static readyDapps: Dapp[];
  static storeObservable: Subject<AnyAction>;

  constructor(store: Store<IState>, globalUUIDList: RendererConf[], clientWindow: Electron.BrowserWindow) {
    if (!store || !globalUUIDList || !clientWindow) {
      throw Error('Arguments must be objects');
    }

    AppMain.store = store;
    AppMain.globalUUIDList = globalUUIDList;
    AppMain.clientWindow = clientWindow;
    AppMain.isClientWindowLoaded = new Promise((resolve, reject) => {
      AppMain.clientWindow.webContents.on('did-finish-load', () => {
        resolve();
      });
    });

    AppMain.storeObservable = storeObservable;
    AppMain.readyDapps = [];

    AppMain.onSwitchDapp();
    AppMain.onCreateDapp();
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

  static onCreateDapp() {
    storeObservable
      .pipe(ofType(constants.CREATE_DAPP_VIEW))
      .subscribe(async (action: AnyAction) => {
        AppMain.createDapp(action.payload.targetDappName);
      });
  }

  static onSwitchDapp() {
    storeObservable
      .pipe(ofType(constants.SWITCH_DAPP))
      .subscribe(async (action: AnyAction) => {
        try {
          await AppMain.openDapp(action.payload.targetDappName);
          AppMain.store.dispatch(clientActions.switchDappSuccess(action.payload.targetDappName));
        } catch (error) {
          AppMain.store.dispatch(clientActions.switchDappFailure(action.payload.targetDappName, error));
        }
      });
  }

  // Find ready dapp name without case sensitive
  static isDappReady(dappName: string = '') {
    return AppMain.readyDapps.find((dapp: Dapp) => dapp.name.toLowerCase() === dappName.toLowerCase());
  }

  static async openDapp(dappName: string) {
    await AppMain.checkDappPermissions(dappName);
    await AppMain.createDapp(dappName);
  }

  static actionPromise({ successType, failureType }: ActionFlow, actionFilter?: (action: AnyAction) => boolean) {
    if (!successType || !failureType) {
      return;
    }

    return new Promise((resolve, reject) => {
      const subscriber = AppMain.storeObservable
        .pipe(
          ofType(constants.SWITCH_DAPP_SUCCESS, constants.SWITCH_DAPP_FAILURE),
          filter((action) => actionFilter && actionFilter(action) || true),
        )
        .subscribe((action) => {
          if (constants.SWITCH_DAPP_SUCCESS) {
            resolve(action);
          }

          if (constants.SWITCH_DAPP_FAILURE) {
            reject(action);
          }
          subscriber.unsubscribe();
        });
    });
  }

  static async httpProtocolOpenLink(link: string) {
    const state = AppMain.store.getState();
    const clearLink = link && link.replace('arr://', '');

    const [dappName, ...params] = clearLink.split('/').filter(item => item);
    const requestDapp = AppMain.getDappItem(dappName);

    if (!requestDapp) {
      throw Error('Dapp does not exist');
    }

    const activeDapp = activeDappSelector(state);
    const requestDappName = requestDapp.appName;
    const isDappOpen = activeDapp === requestDappName;
    console.log('httpProtocolOpenLink link', link, clearLink);
    console.log('httpProtocolOpenLink', activeDapp, !isDappOpen, !AppMain.isDappReady(requestDappName));
    console.log('httpProtocolOpenLink requestDappName', requestDappName);

    if (!isDappOpen || !AppMain.isDappReady(requestDappName)) {
      AppMain.store.dispatch(clientActions.switchDapp(requestDappName));

      await AppMain.actionPromise({
        successType: constants.SWITCH_DAPP_SUCCESS,
        failureType: constants.SWITCH_DAPP_FAILURE,
      }, (action) => action.payload.targetDappName === requestDappName);
    }

    const createdDapp = AppMain.getDappUUUIDByName(requestDappName);

    console.log('httpProtocolOpenLink resolve', createdDapp, params);
    if (createdDapp) {
      AppMain.store.dispatch(
        {
          type: constants.DAPP_ACTION_OPEN_LINK,
          payload: { params },
          meta: {
            targetUUID: createdDapp.id
          }
        });
    }
  }

  static async createDapp(targetDappName: string) {
    console.log('onSwitchDapp start');
    const activeDapp = AppMain.getDappItem(targetDappName);
    const activeDappRenderer = createDappView(AppMain.globalUUIDList, activeDapp);
    const dappView = activeDappRenderer && activeDappRenderer.dappView || null;
    const state = AppMain.store.getState();
    const isDappReady = AppMain.isDappReady(targetDappName);
    let dappReadyPromise: Promise<void>;

    console.log('onSwitchDapp: dappView', dappView, activeDappRenderer);

    // If dapp hasn't opened waiting for loading dapp
    if (!isDappReady) {
      dappReadyPromise = AppMain.onAction(constants.DAPP_CONTENT_LOADED, (action) => action.meta.sourceUUID === activeDappRenderer.id)
        .then((action: AnyAction) => {
          AppMain.readyDapps.push({ uuid: action.meta.sourceUUID, name: action.meta.name });
        });
    }

    console.log('onSwitchDapp: dappCreated', dappView);
    AppMain.clientWindow.setBrowserView(dappView);

    AppMain.correctDappViewBounds();

    await dappReadyPromise;
  }

  static async checkDappPermissions(targetDappName: string) {
    const activeDapp = AppMain.getDappItem(targetDappName);
    const state = AppMain.store.getState();

    await AppMain.isClientWindowLoaded;

    const activeDappGranted = state.permissionManager.grantedApps.includes(targetDappName);
    console.log('checkDappPermissions', activeDappGranted, targetDappName, activeDapp, state.permissionManager);
    if (!activeDappGranted) {
      AppMain.permissionWindow = createPermissionWindow(AppMain.globalUUIDList, AppMain.clientWindow, targetDappName, activeDapp.permissions);
      AppMain.permissionWindow.on('closed', () => {
        AppMain.permissionWindow = null;
      });

      await AppMain.onAction(constants.GRANT_PERMISSIONS, (action) => action.payload.appName === targetDappName);
      console.log('checkDappPermissions grant', AppMain.store.getState().permissionManager);
    }
  }

  static onAction(actionType: string, filterAction?: (action: AnyAction) => boolean) {
    return new Promise((resolve, reject) => {
      const subscriber = AppMain.storeObservable
        .pipe(
          ofType(actionType),
          filter((action) => filterAction && filterAction(action) || !!action),
        )
        .subscribe((action) => {
          resolve(action);
          subscriber.unsubscribe();
        });
    });
  }

  static closeDappPermissionWindow() {
    if (AppMain.permissionWindow) {
      AppMain.permissionWindow.close();
      console.log('onSwitchDapp: close permissionManager');
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

  static getDappItem(dappName: string = '') {
    return AppsManager.dapps.find(dappObj => dappObj.appName && dappObj.appName.toLowerCase() === dappName.toLowerCase());
  }

  static getDappUUUIDByName(dappName: string = ''): RendererConf {
    return AppMain.globalUUIDList.find(item => item.name === dappName && item.status === 'dapp');
  }

}
