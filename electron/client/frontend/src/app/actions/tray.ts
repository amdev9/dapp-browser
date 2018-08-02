import { createAction } from "redux-actions"
import { TrayItem } from "app/models"
import { Option } from "space-lift"

export namespace TrayActions {
  export enum Type {
    // Load items for tray (from db in the future)
    UPLOAD_TRAY_ITEMS = "UPLOAD_TRAY_ITEMS",

    // Change status fields of item
    CHANGE_STATUS = "CHANGE_TRAY_STATUS",

    // Reorder
    SET_POSITION = "SET_TRAY_POSITION",

    // Set showed indicator type
    SET_INDICATOR = "SET_TRAY_INDICATOR",

    // Set progress indicator value
    SET_PROGRESS = "SET_TRAY_PROGRESS",

    // Set counter indicator value
    SET_COUNTER = "SET_TRAY_COUNTER",

    // Remove item from tray
    REMOVE_ITEM = "REMOVE_TRAY_ITEM",

    // Pin app
    UNPIN = "UNPIN",
    PIN = "PIN",
  }

  export namespace Payload {
    export type ItemIndex = number
    export type ItemName = string

    export interface SetPosition {
      type: TrayItem.Type,
      oldIndex: ItemIndex
      newIndex: ItemIndex
    }

    export interface ChangeStatus {
      status: TrayItem.Status
      itemIndex: ItemIndex
      type: TrayItem.Type
      enabled: boolean
    }

    export interface SetIndicator {
      indicator: Option<TrayItem.Indicator>
      type: TrayItem.Type
      item: ItemName
    }

    export interface SetProgress {
      progress: Option<number>
      type: TrayItem.Type
      item: ItemName
    }

    export interface SetCounter {
      counter: Option<number>
      type: TrayItem.Type
      item: ItemName
    }

    export interface RemoveItem {
      type: TrayItem.Type
      item: ItemName
    }
  }

  export const setShowedIndicator = createAction<Payload.SetIndicator>(Type.SET_INDICATOR)
  export const changeStatus = createAction<Payload.ChangeStatus>(Type.CHANGE_STATUS)
  export const setPosition = createAction<Payload.SetPosition>(Type.SET_POSITION)
  export const uploadTrayItems = createAction<TrayItem[]>(Type.UPLOAD_TRAY_ITEMS)
  export const setProgress = createAction<Payload.SetProgress>(Type.SET_PROGRESS)
  export const setCounter = createAction<Payload.SetCounter>(Type.SET_COUNTER)
  export const removeItem = createAction<Payload.RemoveItem>(Type.REMOVE_ITEM)
  export const unpin = createAction<Payload.ItemIndex>(Type.UNPIN)
  export const pin = createAction<Payload.ItemIndex>(Type.PIN)
}
