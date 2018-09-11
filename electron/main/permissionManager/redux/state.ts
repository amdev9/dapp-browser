import { Permission } from './model';

export interface PermissionList {
  items: Permission[]
}

export interface IState {
  permissions: PermissionList
}

