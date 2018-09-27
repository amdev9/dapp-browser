import { CLOSE_MANAGER, TOGGLE_PERMISSION } from '../constants';
import { PermissionAction } from '../actions/permission';
import { IState, PermissionList } from './state';

let perm: PermissionList;

const initialState: IState = {
  permissions: perm
}

export default function permission(state: IState = initialState, action: PermissionAction) {
  switch (action.type) {
    case TOGGLE_PERMISSION:
      return {
        ...state,
        permissions: state.permissions.concat() //@todo add to array checked permission
      }
    case CLOSE_MANAGER:
      return state;

    default:
      return state;
  }
}
