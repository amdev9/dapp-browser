import { AnyAction, Store } from 'redux';
import { IState } from './reducers/state';
import { RendererConf, globalUUIDList } from './constants/globalVariables';
import { createClientWindow } from "../createClientWindow";
import BrowserWindow = Electron.BrowserWindow;

export default class ClientManager {
  static store: Store<IState>;
  static globalUUIDList: RendererConf[];
  static clientWindow: Electron.BrowserWindow;
  static isClientWindowLoaded: Promise<void>;

  constructor(store: Store<IState>) {
    if (!store) {
      throw Error('Store must be an object');
    }

    ClientManager.store = store;
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
