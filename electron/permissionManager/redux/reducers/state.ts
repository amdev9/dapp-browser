
export type Permission = "ipfs" | "network" | "storage";
export interface PermissionManager {
  isOpen: boolean,
  items: Permission[]
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

