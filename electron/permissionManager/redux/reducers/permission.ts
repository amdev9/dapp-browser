import { CLOSE_MANAGER, TOGGLE_PERMISSION } from '../constants';
import { PermissionAction } from '../actions/permission';
import { PermissionList, Permission } from './state';

 
let perm: Permission[];

const initialState: PermissionList = {
  items: perm
}

export function permission(state: PermissionList = initialState, action: PermissionAction) {
  switch (action.type) {
    case TOGGLE_PERMISSION:
      return state;
    case CLOSE_MANAGER:
      return state;
    default:
      return state;
  }
}
