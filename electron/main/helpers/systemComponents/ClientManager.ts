import { Store } from 'redux';
import { IState } from '../reducers/state';
import { globalUUIDList } from '../constants/globalVariables';
import { createClientWindow } from '../../createClientWindow';
import BrowserWindow = Electron.BrowserWindow;
import * as clientActions from '../actions/client';
import { AppsManager } from './AppsManager';

export default class ClientManager {
  static store: Store<IState>;
  static clientWindow: Electron.BrowserWindow;
  static isClientWindowLoaded: Promise<void>;

  constructor(store: Store<IState>) {
    if (!store) {
      throw Error('Store must be an object');
    }

    ClientManager.store = store;
  }

  static async switchDapp(dappName: string) {
    try {
      await ClientManager.isClientWindowLoaded;
      await AppsManager.openDapp(dappName, ClientManager.clientWindow, ClientManager.store.getState());
      ClientManager.store.dispatch(clientActions.switchDappSuccess(dappName));
    } catch (error) {
      ClientManager.store.dispatch(clientActions.switchDappFailure(dappName, error));
    }
  }

  static toggleHome() {
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
    const clientWindow = createClientWindow(globalUUIDList, ClientManager.store);
    ClientManager.setClientWindow(clientWindow);

    return clientWindow;
  }

}
