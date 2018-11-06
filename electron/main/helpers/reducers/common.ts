import { Action } from 'redux';

interface PermissionAction extends Action {
  payload: {
    permissionName: string;
    checked: boolean;
    appName: string;
  };
}

interface StatePermissions {
  [index: string]: string[];
}

export const togglePermissions = (action: PermissionAction, statePermissions: StatePermissions) => {
  const appName = action.payload.appName;
  const permissionName = action.payload.permissionName;
  const checked = action.payload.checked;
  let appPermissions = statePermissions[appName];
  if (!appPermissions) {
    appPermissions = [];
  }
  const permissions = { ...statePermissions };
  if (checked) {
    if (appPermissions.indexOf(permissionName) === -1) {
      permissions[appName] = [...appPermissions, permissionName];
    }
  } else {
    permissions[appName] = appPermissions.filter(item => item !== permissionName);
  }
  return permissions;
};
