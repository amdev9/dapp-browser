import { Action, handleActions } from "redux-actions"
import * as Sortable from "react-sortable-hoc"
import { RootState } from "app/reducers/state"
import { TrayActions } from "app/actions"
import { TrayItem } from "app/models"
import saveToDb from "app/utils/db"
import * as _ from "lodash"

const initialState: RootState.Tray = {
  activeItems: {},
  pinnedItems: {},

  activeKeys: [],
  pinnedKeys: [],

  isOpen: true,
}

type StatusField = "disabled" | "running" | "loading" | "active"
type TypeItems = "activeItems" | "pinnedItems"
type TypeKeys = "pinnedKeys" | "activeKeys"

export const trayReducer = handleActions<RootState.Tray, any>({
  [TrayActions.Type.SET_POSITION]: (state, action: Action<TrayActions.Payload.SetPosition>) => {
    const { payload } = action

    if (payload) {
      const typeItems: TypeItems = payload.type === TrayItem.Type.Pinned ? "pinnedItems" : "activeItems"
      const typeKeys: TypeKeys = payload.type === TrayItem.Type.Pinned ? "pinnedKeys" : "activeKeys"

      let items: string[] = []
      if (state[typeKeys][payload.oldIndex]) {
        const itemKey = state[typeKeys][payload.oldIndex]
        state[typeItems][itemKey].position = payload.newIndex

        items = Sortable.arrayMove(state[typeKeys], payload.oldIndex, payload.newIndex)
      } else {
        items = []
      }

      // @TODO: add save to database here
      saveToDb(items)

      return {
        ...state,
        [typeKeys]: items,
      }
    } else {
      return state
    }
  },

  [TrayActions.Type.CHANGE_STATUS]: (state, action: Action<TrayActions.Payload.ChangeStatus>) => {
    const { payload } = action

    if (payload) {
      const typeItems: TypeItems = payload.type === TrayItem.Type.Pinned ? "pinnedItems" : "activeItems"
      const typeKeys: TypeKeys = payload.type === TrayItem.Type.Pinned ? "pinnedKeys" : "activeKeys"

      const field = status.toString().toLowerCase() as StatusField
      const itemsKey = state[typeKeys]
      const items = state[typeItems]

      const itemKey = itemsKey[payload.itemIndex]
      const item = items[itemKey]
      item[field] = payload.enabled

      items[itemKey] = item

      // @TODO: add save to database here
      saveToDb(items)

      return {
        ...state,
        [typeItems]: items,
      }
    } else {
      return state
    }
  },

  [TrayActions.Type.UPLOAD_TRAY_ITEMS]: (state, action: Action<TrayItem[]>) => {
    const { payload } = action

    if (payload) {
      let activeItems: TrayItem[] = []
      let pinnedItems: TrayItem[] = []

      _.each(payload, (item) => {
        if (item.pin) {
          pinnedItems.push(item)
        } else {
          activeItems.push(item)
        }
      })

      activeItems = _.sortBy(activeItems, "position")
      pinnedItems = _.sortBy(pinnedItems, "position")

      // @TODO: add save to database here
      saveToDb({ activeItems, pinnedItems })

      return {
        ...state,

        activeItems: _.keyBy(activeItems, (item) => item.name),
        pinnedItems: _.keyBy(pinnedItems, (item) => item.name),

        activeKeys: _.map(activeItems, (item) => item.name),
        pinnedKeys: _.map(pinnedItems, (item) => item.name),
      }
    } else {
      return state
    }
  },

  [TrayActions.Type.UNPIN]: (state, action: Action<TrayActions.Payload.ItemIndex>) => {
    const { pinnedItems, activeItems, pinnedKeys, activeKeys } = state
    const { payload } = action

    if (typeof (payload) === "number") {
      const itemKey = pinnedKeys[payload]
      const item = pinnedItems[itemKey]

      item.position = activeKeys.length
      item.pin = false

      activeKeys.push(item.name)
      pinnedKeys.splice(payload, 1)

      activeItems[itemKey] = item
      delete pinnedItems[itemKey]

      // @TODO: add save to database here
      saveToDb({ activeItems, pinnedItems })

      return {
        ...state,
        pinnedItems,
        activeItems,
      }
    } else {
      return {
        ...state,
      }
    }
  },

  [TrayActions.Type.PIN]: (state, action: Action<TrayActions.Payload.ItemIndex>) => {
    const { pinnedItems, activeItems, pinnedKeys, activeKeys } = state
    const { payload } = action

    // !payload not work because type cast in js handle it as false boolean
    if (typeof (payload) === "number") {
      const itemKey = activeKeys[payload]
      const item = activeItems[itemKey]

      item.position = pinnedKeys.length
      item.pin = true

      pinnedKeys.push(item.name)
      activeKeys.splice(payload, 1)

      pinnedItems[itemKey] = item
      delete activeItems[itemKey]

      // @TODO: add save to database here
      saveToDb({ activeItems, pinnedItems })

      return {
        ...state,
        pinnedItems,
        activeItems,
      }
    } else {
      return {
        ...state,
      }
    }
  },

  [TrayActions.Type.SET_INDICATOR]: (state, action: Action<TrayActions.Payload.SetIndicator>) => {
    const { payload } = action

    if (payload) {
      const typeItems: TypeItems = payload.type === TrayItem.Type.Pinned ? "pinnedItems" : "activeItems"
      const item = state[typeItems][payload.item]
      item.indicator = payload.indicator

      return {
        ...state,
        [typeItems]: {
          ...[state[typeItems]],
          item,
        },
      }
    } else {
      return {
        ...state,
      }
    }
  },

  [TrayActions.Type.SET_PROGRESS]: (state, action: Action<TrayActions.Payload.SetProgress>) => {
    const { payload } = action

    if (payload) {
      const typeItems: TypeItems = payload.type === TrayItem.Type.Pinned ? "pinnedItems" : "activeItems"
      const item = state[typeItems][payload.item]
      item.counter = payload.progress

      return {
        ...state,
        [typeItems]: {
          ...[state[typeItems]],
          item,
        },
      }
    } else {
      return {
        ...state,
      }
    }
  },

  [TrayActions.Type.SET_COUNTER]: (state, action: Action<TrayActions.Payload.SetCounter>) => {
    const { payload } = action

    if (payload) {
      const typeItems: TypeItems = payload.type === TrayItem.Type.Pinned ? "pinnedItems" : "activeItems"
      const item = state[typeItems][payload.item]
      item.indicator = payload.counter

      return {
        ...state,
        [typeItems]: {
          ...[state[typeItems]],
          item,
        },
      }
    } else {
      return {
        ...state,
      }
    }
  },

  [TrayActions.Type.REMOVE_ITEM]: (state, action: Action<TrayActions.Payload.RemoveItem>) => {
    const { payload } = action

    if (payload) {
      const typeItems: TypeItems = payload.type === TrayItem.Type.Pinned ? "pinnedItems" : "activeItems"
      const typeKeys: TypeKeys = payload.type === TrayItem.Type.Pinned ? "pinnedKeys" : "activeKeys"

      const itemsKeys = state[typeKeys]
      const keyIndex = itemsKeys.indexOf(payload.item)
      itemsKeys.splice(keyIndex, 1)

      const items = state[typeItems]
      delete items[payload.item]

      return {
        ...state,
        [typeItems]: { ...items },
        [typeKeys]: itemsKeys,
      }
    } else {
      return {
        ...state,
      }
    }
  },
}, initialState)
