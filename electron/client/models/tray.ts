import { Option } from "space-lift"

/*
disabled + loading = updating
loading - only loading indicator (or typing)running
*/

export interface TrayItem {
  // Not can be runned
  disabled: boolean
  // Is already running
  running: boolean
  // Now app is loading ("on start" or "updating")
  loading: boolean
  // This app is active - current show on content view
  active: boolean
  // Icon of this app
  icon: string
  // App name
  name: string
  // App is pinned on top
  pin: boolean
  // Position in order list
  position: number

  // Custom image
  image: Option<string>
  // Custom indicator
  indicator: Option<TrayItem.Indicator>
  // Progress status
  progress: Option<number>
  // Counter indicator
  counter: Option<number>
}

export namespace TrayItem {
  export enum Status {
    Disabled,
    Loading,
    Running,
    Active,
  }

  export enum Indicator {
    Progress,
    Loading,
    Counter,
  }

  export enum Type {
    Pinned = "Pinned",
    Active = "Active",
  }
}
