export interface StatusBarItem {
  status: StatusBarItem.Status
  peers: number
  // Name (or title) of bar. unique, string
  name: string

  nodesTotal: number
  nodes: number

  // Time in milliseconds
  timeTotal: number
  time: number
}

export namespace StatusBarItem {
  export enum Status {
    Connecting,
    Connected,
    Closed,
  }
}