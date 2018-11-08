import { CLOSE_MANAGER, TOGGLE_PERMISSION, GRANT_PERMISSIONS, LOAD_PERMISSIONS } from '../constants';
import { PermissionManager} from './state';
import { togglePermissions } from '../../../main/helpers/reducers/common';
import { Action } from 'redux';

interface PermissionAction extends Action {
  payload: {
    permissionName: string;
    checked: boolean;
    appName: string;
  };
}

// let perm: Permission[];
//
// const initialState: PermissionManager = {
//   isOpen: false,
//   items: perm,
//   grantedApps: []
// };

export function permissionManager(state: PermissionManager = null, action: PermissionAction) {
  switch (action.type) {
    case TOGGLE_PERMISSION:
      const statePermissions = state.permissions;
      const permissions = togglePermissions(action, statePermissions);

      return { ...state, permissions };
    case CLOSE_MANAGER:
      return state; // state.granted // if granted not spawn permissionManager
    case GRANT_PERMISSIONS:
      return state;
    case LOAD_PERMISSIONS:
      return state;
    default:
      return state;
  }
}
