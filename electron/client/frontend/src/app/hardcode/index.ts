import { TrayActions, NotificationsActions, StatusBarActions, SearchActions } from "app/actions"
import { Dispatch } from "redux"

// Data
import { notifyItemsInitialState } from "app/hardcode/notifications"
import { statusBarItemsInitialState } from "app/hardcode/status-bar"
import { searchItemsInitialState } from "app/hardcode/search"
import { trayItemsInitialState } from "app/hardcode/tray"

export function initHardcodeState(dispatch: Dispatch) {
  dispatch(NotificationsActions.uploadNotifications(notifyItemsInitialState))
  dispatch(StatusBarActions.uploadStatuBarItems(statusBarItemsInitialState))
  dispatch(SearchActions.uploadSuggests(searchItemsInitialState))
  dispatch(TrayActions.uploadTrayItems(trayItemsInitialState))
}
