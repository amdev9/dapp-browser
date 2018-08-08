// import { RouterState } from "react-router-redux"
import { Option } from "space-lift"
import * as _ from "lodash"

import {
  KeychainSessionItem,
  StatusBarItem,
  KeychainItem,
  NotifyItem,
  SearchItem,
  TrayItem,
} from "app/models"

export interface RootState {
  notifications: RootState.Notifications
  statusbar: RootState.StatusBar
  keychain: RootState.Keychain
  // launcher: RootState.Launcher
  search: RootState.Search
  common: RootState.Common
  tray: RootState.Tray
  // router: RouterState
}

export namespace RootState {
  export interface Tray {
    pinnedItems: _.Dictionary<TrayItem>
    activeItems: _.Dictionary<TrayItem>

    activeKeys: string[]
    pinnedKeys: string[]

    isOpen: boolean
  }

  export interface Notifications {
    items: _.Dictionary<NotifyItem[]>
    keysByItem: string[]
    isOpen: boolean
  }

  export interface StatusBar {
    items: _.Dictionary<StatusBarItem>
    keysByItem: string[]
    isOpen: boolean
  }

  export interface Search {
    [groupName: string]: SearchItem[]
  }

  export interface Keychain {
    items: _.Dictionary<KeychainItem>
    keysByItem: string[]

    // Sessions by { [app_name]: Session }
    sessions: _.Dictionary<Option<KeychainSessionItem>>
    keysBySession: string[]
  }

  export interface Common {
    locale: string
    title: string
  }

  // export interface Launcher {
  //   // Current rinning and showed app
  //   showed: Option<Launcher.App>
  //   // Map with all running apps
  //   running: _.Dictionary<Launcher.App>
  // }

  // export namespace Launcher {
  //   export interface App {
  //     appQueryProperties: _.Dictionary<any>
  //     name: string
  //   }
  // }
}
