import { app } from 'electron';
import { Store } from 'redux';
import { IState } from '../reducers/state';
import { globalUUIDList } from '../constants/globalVariables';
import { createClientWindow } from '../../createClientWindow';
import BrowserWindow = Electron.BrowserWindow;
import * as clientActions from '../actions/client';
import { AppsManager } from './AppsManager';
import StoreManager from './StoreManager';

export default class ClientManager {
  static clientWindow: Electron.BrowserWindow;
  static isClientWindowLoaded: Promise<void>;

  static async switchDapp(dappName: string) {
    try {
      await ClientManager.isClientWindowLoaded;
      await AppsManager.openDapp(dappName, ClientManager.clientWindow, StoreManager.store.getState());
      StoreManager.store.dispatch(clientActions.switchDapp(dappName));
      StoreManager.store.dispatch(clientActions.switchDappSuccess(dappName));
    } catch (error) {
      StoreManager.store.dispatch(clientActions.switchDappFailure(dappName, error));
    }
  }

  static toggleHome() {
    AppsManager.resetDappFocusActiveDapp();
    ClientManager.clientWindow.setBrowserView(null);
  }

  static setClientWindow(clientWindow: BrowserWindow) {
    ClientManager.clientWindow = clientWindow;
    ClientManager.isClientWindowLoaded = new Promise((resolve, reject) => {
      ClientManager.clientWindow.webContents.on('did-finish-load', () => {
        resolve();
      });
    });
  }

  static createClientWindow(): BrowserWindow {
    const clientWindow = createClientWindow(globalUUIDList, StoreManager.store);
    ClientManager.setClientWindow(clientWindow);

    return clientWindow;
  }

  static setBadge(text: string): void {
    app.dock.setBadge(text);
  }

  static getBadge(): string {
    return app.dock.getBadge();
  }

}
