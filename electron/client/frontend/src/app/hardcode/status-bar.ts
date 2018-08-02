import { StatusBarItem } from "app/models"

export const statusBarItemsInitialState: StatusBarItem[] = [{
  status: StatusBarItem.Status.Connecting,
  peers: 25,
  // Name (or title) of bar. unique, string
  name: "Russia, Moscow",

  nodesTotal: 56430,
  nodes: 76,

  // Time in milliseconds
  timeTotal: 120000,
  time: 28000,
}, {
  status: StatusBarItem.Status.Connected,
  peers: 34,
  // Name (or title) of bar. unique, string
  name: "Germany, Berlin",

  nodesTotal: 26530,
  nodes: 457,

  // Time in milliseconds
  timeTotal: 120000,
  time: 66000,
}]
