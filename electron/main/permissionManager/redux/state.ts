import { Permission } from './model';

export interface MapPermission {
  type: Permission,
  granted: boolean
}

export interface PermissionList extends Array<MapPermission> {
  items: MapPermission[]
}

export interface IState {
  permissions: PermissionList
}

