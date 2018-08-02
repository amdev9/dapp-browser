import { createAction } from "redux-actions"
import { NotifyItem } from "app/models"

export namespace NotificationsActions {
  export enum Type {
    TOGGLE_NOTIFY_SIDEBAR = "TOGGLE_NOTIFY_SIDEBAR",
    UPLOAD_NOTIFY_ITEMS = "UPLOAD_NOTIFY_ITEMS",
    CLEAR_GROUP = "CLEAR_NOTIFY_GROUP",
    CREATE_NOTIFY = "CREATE_NOTIFY",
  }

  export namespace Payload {
    export type TogglePopup = boolean | undefined
    export type GroupId = string
  }

  export const togglePopup = createAction<Payload.TogglePopup>(Type.TOGGLE_NOTIFY_SIDEBAR)
  export const uploadNotifications = createAction<NotifyItem[]>(Type.UPLOAD_NOTIFY_ITEMS)
  export const clearGroup = createAction<Payload.GroupId>(Type.CLEAR_GROUP)
  export const createNotify = createAction<NotifyItem>(Type.CREATE_NOTIFY)
}
