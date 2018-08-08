import { RouterState } from "react-router-redux" //  routerReducer,
import { RootState } from "app/reducers/state"
import { combineReducers } from "redux"

import { notificationsReducer } from "app/reducers/notifications"
import { statusBarReducer } from "app/reducers/status-bar"
import { keychainReducer } from "app/reducers/keychain"
// import { launcherReducer } from "./launcher"
import { commonReducer } from "app/reducers/common"
import { searchReducer } from "app/reducers/search"
import { trayReducer } from "app/reducers/tray"

export const rootReducer = combineReducers<RootState>({
  notifications: notificationsReducer as any,
  statusbar: statusBarReducer as any,
  keychain: keychainReducer as any,
  // launcher: launcherReducer as any,
  // router: routerReducer as any,
  search: searchReducer as any,
  common: commonReducer as any,
  tray: trayReducer as any,
})

export { RootState, RouterState }
