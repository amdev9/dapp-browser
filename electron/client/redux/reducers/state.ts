import { AppItem, ActiveDapp, StatusBarItem, FeedItem, SearchItem } from '../model';
export { NotificationPanel } from '../model';
import { models as NotificationModels } from '../../modules/Notification';
import { models as IpfsStorageModels } from '../../modules/IpfsStorage';

export interface ToggleStatus {
  notification: boolean;
  loader: boolean;
  settings: boolean;
  statusBar: boolean;
  statusBarPeers: boolean;
  search: boolean;
  keychain: boolean;
  [key: string]: boolean;
}

export interface Feed {
  items: FeedItem[];
}

export interface Tray {
  items: AppItem[];
  activeDapp: ActiveDapp;
  pinned: string[];
  isHome: boolean;
}

export interface KeychainPanel {
  items: string[];
  selectedKey: string;
  unlocked: boolean;
}

export interface LoaderPanel {
  activeTab: string;
}

export interface SettingsPanel {
}

export interface StatusBarPanel {
  items: { [index: string]: StatusBarItem; };
  loggerWrite: boolean;
}

export interface SearchPanel {
  items: { [groupName: string]: SearchItem[]; };
}

export interface PermissionsPanel {
  permissions: {[index: string]: Permission[]};
}

export interface IState {
  notification: NotificationModels.NotificationPanel;
  keychain: KeychainPanel;
  loader: LoaderPanel;
  statusBar: StatusBarPanel;
  tray: Tray;
  feed: Feed;
  settings: SettingsPanel;
  search: SearchPanel;
  permissions: PermissionsPanel;
  isOpen: ToggleStatus;
  ipfsStorage: IpfsStorageModels.IpfsStorageState;
}

export type IsHome = boolean;
export interface Window {
  height: number;
  weight: number;
}
export interface ActiveDapp {
  appName: string;
}

export type Permission = 'ipfs' | 'network' | 'storage' | 'filesystem' | 'logger' | 'keychain';
