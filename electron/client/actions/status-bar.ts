import { createAction } from "redux-actions"
import { StatusBarItem } from "app/models"

export namespace StatusBarActions {
  export enum Type {
    UPLOAD_STATUS_BAR_ITEMS = "UPLOAD_STATUS_BAR_ITEMS",
    CHANGE_STATUS = "CHANGE_STATUS_BAR_STATUS",
    SET_POSITION = "SET_STATUS_BAR_POSITION",
    TOGGLE_STATUSBAR = "TOGGLE_STATUSBAR",
  }

  export namespace Payload {
    export interface SetPosition {
      oldIndex: number
      newIndex: number
    }

    export interface ChangeStatus {
      status: StatusBarItem.Status
      // Its `StatusBarItem.name`
      // The item name is unique so it is used as a search argument
      item: string
    }

    export type Toggle = boolean | undefined
  }

  export const uploadStatuBarItems = createAction<StatusBarItem[]>(Type.UPLOAD_STATUS_BAR_ITEMS)
  export const changeStatus = createAction<Payload.ChangeStatus>(Type.CHANGE_STATUS)
  export const setPosition = createAction<Payload.SetPosition>(Type.SET_POSITION)
  export const toggleStatusBar = createAction<Payload.Toggle>(Type.TOGGLE_STATUSBAR)
}
