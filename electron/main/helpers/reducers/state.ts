// global main state
// redux-persist integration here

export type Client = {
  activeDapp: {
    appName: any
  },
  isHome: boolean,
  notification: {
    isOpen: boolean
  },
  statusBar: {
    isOpen: boolean,
    isPeersOpen: boolean
  },
  loader: {
    isOpen: boolean
  },
  search: {
    isOpen: boolean
  },
  window: {
    width: number,
    height: number
  },
  fileDialog: {
    isOpen: boolean
  }
}
export interface IState {
  channel: {};
  client: Client;
  feed: {};
  permissions: {};
  tray: {};

  //@todo add MapPermissions
}

