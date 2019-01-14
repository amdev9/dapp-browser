import { globalUUIDList } from '../constants/globalVariables';
import { createClientWindow } from '../../createClientWindow';
import BrowserWindow = Electron.BrowserWindow;
import StoreManager from './StoreManager';

export default class ClientManager {
  static clientWindow: Electron.BrowserWindow;
  static isClientWindowLoaded: Promise<void>;

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

}
