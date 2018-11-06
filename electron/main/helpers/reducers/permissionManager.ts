import { Action } from 'redux';
import {
  TOGGLE_PERMISSION,
  CLOSE_MANAGER,
  GRANT_PERMISSIONS,
  LOAD_PERMISSIONS,
} from '../constants';
import { togglePermissions } from './common';

interface PermissionAction extends Action {
  payload: {
    permissionName: string;
    checked: boolean;
    appName: string;
  };
}

interface PermissionsState {
  isOpen: boolean;
  permissions: {[index: string]: string[]};
  grantedApps: string[];
}

export function permissionManager(state: PermissionsState = null, action: PermissionAction) {
  switch (action.type) {
    case TOGGLE_PERMISSION: {
      const permissions = togglePermissions(action, state.permissions);
      return { ...state, permissions };
    }
    case CLOSE_MANAGER:
      return { ...state, isOpen: false };
    case LOAD_PERMISSIONS:
      return { ...state, isOpen: true };
    case GRANT_PERMISSIONS:
      const appName = action.payload.appName;
      const grantedApps = [...state.grantedApps];
      if (state.grantedApps.indexOf(appName) === -1) {
        grantedApps.push(appName);
      }
      return { ...state, grantedApps, isOpen: false };

    default:
      return state;
  }
}
