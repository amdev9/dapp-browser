import { action } from 'typesafe-actions';
import { CLOSE_MANAGER, TOGGLE_PERMISSION, GRANT_PERMISSIONS, LOAD_PERMISSIONS } from '../constants';
import { Permission } from '../model';

 
export const closeManager = () => action(CLOSE_MANAGER);
export const togglePermission = (permissionName: Permission, checked: boolean, appName: boolean) => action(TOGGLE_PERMISSION, {permissionName, checked, appName});
export const grantPermissions = (appName: string) => action(GRANT_PERMISSIONS, {appName});
export const loadPermissions = () => action(LOAD_PERMISSIONS);
 
