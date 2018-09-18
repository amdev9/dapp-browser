// global main state
// redux-persist integration here

export type Client = {
  activeDapp?: {
    appName?: string
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
  }
}
export interface IState {
  channel: {};
  client: Client,
  feed: {}

  //@todo add MapPermissions
}

