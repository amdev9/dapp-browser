// global main state
// redux-persist integration here

export type Permission = 'ipfs' | 'network' | 'filesystem' | 'storage' | 'logger' | 'keychain' | 'orbitdb'; // todo can we get these values from ../constants ?

export type Client = {
  activeDapp: {
    appName: any,
  },
  isHome: boolean,
  notification: {
    isOpen: boolean,
  },
  statusBar: {
    isOpen: boolean,
    isPeersOpen: boolean,
  },
  loader: {
    isOpen: boolean,
  },
  search: {
    isOpen: boolean,
  },
  window: {
    width: number,
    height: number,
  },
  fileDialog: {
    isOpen: boolean,
  },
};

// @todo refactor
// export interface ToggleStatus {
//   isHome
//   notification isOpen
//   loader isOpen
//   statusBar isOpen
//   statusBar isPeersOpen
//   search isOpen
//   fileDialog isOpen
// }

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
