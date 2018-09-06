// global main state
// redux-persist integration here

export type Client = {
  activeDapp?: {
    id?: number,
    appName?: string
  },
  isHome: boolean,
  notification: {
    isOpen: boolean
  },
  statusBar: {
    isOpen: boolean
  },
  loader: {
    isOpen: boolean
  },
  feedSize: {
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

