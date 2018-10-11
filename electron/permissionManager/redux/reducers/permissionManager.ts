import { CLOSE_MANAGER, TOGGLE_PERMISSION, GRANT_PERMISSIONS, LOAD_PERMISSIONS } from '../constants';
import { PermissionAction } from './index';
import { PermissionManager} from './state';

 
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
      return state; // state.permissions = [], add or remove from array
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
