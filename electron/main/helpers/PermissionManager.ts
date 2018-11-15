import { createPermissionWindow } from '../createPermissionWindow';
import { BrowserWindow } from 'electron';
import { RendererConf, globalUUIDList } from './constants/globalVariables';
import { onAction } from './utils/actionUtils';
import * as constants from './constants';
import { IState } from './reducers/state';

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
      console.log('onSwitchDapp: close permissionManager');
    }
  }

  static async checkDappPermissions(targetDappName: string, dappsPermissions: string[], clientWindow: BrowserWindow, state: IState) {
    const activeDappGranted = state.permissionManager.grantedApps.includes(targetDappName);
    if (!activeDappGranted) {
      PermissionManager.createPermissionWindow(globalUUIDList, clientWindow, targetDappName, dappsPermissions);

      await onAction(constants.GRANT_PERMISSIONS, (action) => action.payload.appName === targetDappName);
    }
  }
}
