import { Permission } from '../reducers/state';

export type DApp = {
  // Dapp name
  appName: any
  // Preview image (for card on marketplace)
  preview: string
  // icon (eg for tray)
  icon: string
  // Categories
  categories: string[],

  title?: string,
  permissions?: Permission[];
};
