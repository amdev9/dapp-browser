import { Action, handleActions } from "redux-actions"
import { NotificationsActions } from "app/actions"
import { normalizeNotifications } from "app/utils"
import { RootState } from "app/reducers/state"
import { NotifyItem } from "app/models"
import * as moment from "moment"
import * as _ from "lodash"

const initialState: RootState.Notifications = {
  keysByItem: [],
  isOpen: false,
  items: {},
}

type TogglePopupPayload = NotificationsActions.Payload.TogglePopup
type ClearGroupPayload = NotificationsActions.Payload.GroupId

export const notificationsReducer = handleActions<RootState.Notifications, any>({
  [NotificationsActions.Type.TOGGLE_NOTIFY_SIDEBAR]: (state, action: Action<TogglePopupPayload>) => {
    const isOpen = action.payload ? action.payload : !state.isOpen

    return {
      ...state,
      isOpen,
    }
  },

  [NotificationsActions.Type.UPLOAD_NOTIFY_ITEMS]: (state, action: Action<NotifyItem[]>) => {
    const { payload } = action

    if (payload) {
      const items = normalizeNotifications(payload)
      const keysByItem = Object.keys(items)

      return {
        ...state,
        keysByItem,
        items,
      }
    } else {
      return state
    }
  },

  [NotificationsActions.Type.CLEAR_GROUP]: (state, action: Action<ClearGroupPayload>) => {
    const { payload } = action

    if (payload && state.items[payload]) {
      const keysByItem = _.remove(state.keysByItem, (item) => {
        return new Date(item).getTime() !== new Date(payload).getTime()
      })

      delete state.items[payload]

      return {
        ...state,
        keysByItem,
      }
    } else {
      return state
    }
  },

  [NotificationsActions.Type.CREATE_NOTIFY]: (state, action: Action<NotifyItem>) => {
    const { payload } = action

    if (payload) {
      const statusKey = moment(payload.created).startOf("day").toString()

      if (state.items[statusKey]) {
        state.items[statusKey].push(payload)
      } else {
        state.items[statusKey] = [payload]
      }

      let keysByItem = [...state.keysByItem, statusKey]
      keysByItem = keysByItem.sort((a, b) => (new Date(b).getTime()) - (new Date(a).getTime()))

      return {
        ...state,
        keysByItem,
      }
    } else {
      return state
    }
  },
}, initialState)
