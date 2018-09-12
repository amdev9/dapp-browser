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
  settings: {
    isOpen: boolean
  },
  window: {
    width: number,
    height: number
  }
}
export interface IState {
  counter: number;
  channel: {};
  client: Client,
  feed: {}
}

