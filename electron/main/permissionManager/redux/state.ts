// import { Permission } from './model';

export type Permission = "ipfs" | "network" | "storage";

interface ComponentProps {
  required?: boolean,
  dependency?: string[],
}

export type SystemComponent = {
  [key: string]: ComponentProps
} | Permission;

export interface PermissionList extends Array<SystemComponent> {
  items: SystemComponent[]
}

// export interface MapPermission {
//   type: Permission,
//   granted: boolean
// }
// export interface IState {
//   permissions: PermissionList
// }

