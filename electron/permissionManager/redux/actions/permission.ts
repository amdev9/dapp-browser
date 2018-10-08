import { action } from 'typesafe-actions';
import { CLOSE_MANAGER, TOGGLE_PERMISSION } from '../constants';
import { Permission } from '../model';

 
export const closeManager = () => action(CLOSE_MANAGER);
export const togglePermission = (permissionName: Permission, checked: boolean) => action(TOGGLE_PERMISSION, {permissionName, checked});
 
