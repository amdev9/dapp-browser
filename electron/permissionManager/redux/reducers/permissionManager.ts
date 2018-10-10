import { CLOSE_MANAGER, TOGGLE_PERMISSION } from '../constants';
import { PermissionAction } from './index';
import { PermissionManager, Permission } from './state';

 
let perm: Permission[];

const initialState: PermissionManager = {
  isOpen: false,
  items: perm
};

export function permissionManager(state: PermissionManager = initialState, action: PermissionAction) {
  switch (action.type) {
    case TOGGLE_PERMISSION:
      return state; // state.permissions = [], add or remove from array
    case CLOSE_MANAGER:
      return state; // state.granted // if granted not spawn permissionManager 
    default:
      return state;
  }
}
