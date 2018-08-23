// global main state
// redux-persist integration here

export type Client = {
  activeDapp?: {
    id?: number,
    appName?: string
  },
  isHome: boolean
}
export interface IState {
  counter: number;
  channel: {};
  client: Client
}
