import {Action} from "redux";
import {
  TOGGLE_PERMISSION,
  CLOSE_MANAGER,
} from '../constants';

interface PermissionAction extends Action {
  payload: {
    permissionName: string;
    checked: boolean;
    appName: string;
  };
}

interface PermissionsState {
  isOpen: boolean,
  permissions: {[index: string]: string[]};
}

export function permissionManager(state: PermissionsState = null, action: PermissionAction) {
  switch (action.type) {
    case TOGGLE_PERMISSION:
      const appName = action.payload.appName;
      const permissionName = action.payload.permissionName;
      const checked = action.payload.checked;
      let appPermissions = state.permissions[appName];
      if (!appPermissions) {
        appPermissions = [];
      }
      const permissions = {...state.permissions};
      if (checked) {
        if (appPermissions.indexOf(permissionName) === -1) {
          permissions[appName] = [...appPermissions, permissionName];
        }
      } else {
        permissions[appName] = appPermissions.filter(item => item !== permissionName);
      }
      return {...state, permissions};
    case CLOSE_MANAGER:
      return {...state, isOpen: false};
      
    default:
      return state;
  }
}
