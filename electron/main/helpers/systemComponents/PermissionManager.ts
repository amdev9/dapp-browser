import { BrowserWindow } from 'electron';
import { createPermissionWindow } from '../../createPermissionWindow';
import { RendererConf, globalUUIDList } from '../constants/globalVariables';
import * as constants from '../constants';
import StoreManager from './StoreManager';

export default class PermissionManager {
  static permissionWindow: BrowserWindow;

  static createPermissionWindow(globalUUIDList: RendererConf[], clientWindow: BrowserWindow, targetDappName: string, requiredPermissions: string[]) {
    PermissionManager.permissionWindow = createPermissionWindow(globalUUIDList, clientWindow, targetDappName, requiredPermissions);
    PermissionManager.permissionWindow.on('closed', () => {
      PermissionManager.permissionWindow = null;
    });
  }

  static closePermissionWindow() {
    if (PermissionManager.permissionWindow) {
      PermissionManager.permissionWindow.close();
      PermissionManager.permissionWindow = null;
      logger.log('onSwitchDapp: close permissionManager');
    }
  }

  static async checkDappPermissions(targetDappName: string, dappsPermissions: string[], clientWindow: BrowserWindow) {
    if (PermissionManager.permissionWindow) {
      throw Error('Permission window already opened');
    }

    const state = StoreManager.store.getState();

    const activeDappGranted = state.permissionManager.grantedApps.includes(targetDappName);
    if (!activeDappGranted) {
      PermissionManager.createPermissionWindow(globalUUIDList, clientWindow, targetDappName, dappsPermissions);

      await StoreManager.onAction(constants.GRANT_PERMISSIONS, action => action.payload.appName === targetDappName);
    }
  }
}
