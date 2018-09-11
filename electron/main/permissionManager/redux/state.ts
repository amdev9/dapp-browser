import { Permission } from './model';

interface MapPermission {
  type: Permission,
  granted: boolean
}

export interface PermissionList {
  items: MapPermission[]
}

export interface IState {
  permissions: PermissionList
}

