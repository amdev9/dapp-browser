// global main state
// redux-persist integration here

export type Permission = 'ipfs' | 'network' | 'filesystem' | 'storage' | 'logger' | 'keychain' | 'orbitdb'; // todo can we get these values from ../constants ?

export type Client = {
  activeDapp: {
    appName: any,
  },
  isHome: boolean,
  notification: {
  },
  keychain: { items: string[] }
  statusBar: {
  },
  loader: {
  },
  search: {
  },
  window: {
    width: number,
    height: number,
  },
  permissions: {
    permissions: {[index:string]: Permission[]},
  },
  isOpen: {
    notification: boolean,
    statusBar: boolean,
    statusBarPeers: boolean,
    loader: boolean,
    search: boolean,
    keychain: boolean,
  },
};

export interface IState {
  channel: {};
  client: Client;
  feed: {};
  permissionManager: {
    isOpen: boolean,
    permissions: {[index:string]: Permission[]},
    grantedApps: string[],
  };
  tray: {};
}
