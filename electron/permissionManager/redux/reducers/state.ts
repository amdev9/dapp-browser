
export type Permission = "ipfs" | "network" | "storage" | "filesystem";
export interface PermissionManager {
  isOpen: boolean,
  items: Permission[],
  grantedApps: string[]
}
export interface IState {
  permissionManager: PermissionManager
}
  



// import { Permission } from './model';
// interface ComponentProps {
//   required?: boolean,
//   dependency?: string[],
// }
// {
//   [key: string]: ComponentProps
// } | Permission;
// export interface MapPermission {
//   type: Permission,
//   granted: boolean
// }

