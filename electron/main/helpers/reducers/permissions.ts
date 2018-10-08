import {Action} from "redux";
import {
  TOGGLE_PERMISSION,
} from '../constants';

interface PermissionAction extends Action {
  payload: {
    permissionName: string;
    checked: boolean;
  };
}

type PermissionsState = string[];

export function permissions(state: PermissionsState = [], action: PermissionAction) {
  switch (action.type) {
    case TOGGLE_PERMISSION:
      const permissionName = action.payload.permissionName;
      const checked = action.payload.checked;
      if (checked) {
        return [...state, permissionName];
      } else {
        return state.filter(item => item !== permissionName);
      }

    default:
      return state;
  }
}
