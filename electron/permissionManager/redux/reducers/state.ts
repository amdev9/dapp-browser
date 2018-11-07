
export type Permission = 'ipfs' | 'network' | 'storage' | 'filesystem' | 'logger' | 'keychain';

export interface PermissionManager {
  isOpen: boolean;
  permissions: {[index: string]: string[]};
  grantedApps: string[];
}
export interface IState {
  permissionManager: PermissionManager;
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
