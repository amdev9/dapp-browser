export type AppItem = {
  appName: string;
  icon: string;
  statusIcon: string[];
  counter?: number,
  indicator?: number
  pin?: boolean
}

export type ActiveDapp = {
  appName: string;
}
