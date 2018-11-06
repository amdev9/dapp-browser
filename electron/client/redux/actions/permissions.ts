import { action } from 'typesafe-actions';
import * as constants from '../constants';
import { Permission } from '../reducers/state';

export const togglePermission = (permissionName: Permission, checked: boolean, appName: string) => action(constants.TOGGLE_PERMISSION, {permissionName, checked, appName});
export const grantPermissions = (appName: string) => action(constants.GRANT_PERMISSIONS, {appName});
