
export type Permission = "ipfs" | "network" | "storage";
export interface PermissionList {
  items: Permission[]
}
export interface IState {
  permission: PermissionList
};
  



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

