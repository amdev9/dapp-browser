import { Action, handleActions } from "redux-actions"
import { StatusBarActions } from "app/actions"
import * as Sortable from "react-sortable-hoc"
import { RootState } from "app/reducers/state"
import { StatusBarItem } from "app/models"
import * as _ from "lodash"

const initialState: RootState.StatusBar = {
  isOpen: true,
  keysByItem: [],
  items: {},
}

export const statusBarReducer = handleActions<RootState.StatusBar, any>({
  [StatusBarActions.Type.UPLOAD_STATUS_BAR_ITEMS]: (state, action: Action<StatusBarItem[]>) => {
    const { payload } = action

    if (payload) {
      // get normalize items object, by unique name key  
      const items = _.keyBy(payload, (item) => item.name)
      const keysByItem = _.keys(items)

      return {
        ...state,

        items: {
          ...state.items,
          ...items,
        },

        keysByItem: [
          ...keysByItem,
          ...state.keysByItem,
        ],
      }
    } else {
      return state
    }
  },

  [StatusBarActions.Type.CHANGE_STATUS]: (state, action: Action<StatusBarActions.Payload.ChangeStatus>) => {
    const { payload } = action

    if (payload && state.items[payload.item]) {
      state.items[payload.item].status = payload.status
      return state
    } else {
      return state
    }
  },

  [StatusBarActions.Type.SET_POSITION]: (state, action: Action<StatusBarActions.Payload.SetPosition>) => {
    const { payload } = action

    if (payload) {
      const keysByItem = Sortable.arrayMove(state.keysByItem, payload.oldIndex, payload.newIndex)
      // @TODO: add save new positions to database here
      return { ...state, keysByItem }
    } else {
      return state
    }
  },

  [StatusBarActions.Type.TOGGLE_STATUSBAR]: (state, action: Action<StatusBarActions.Payload.Toggle>) => {
    const { payload } = action
    const isOpen = payload ? payload : !state.isOpen

    return {
      ...state,
      isOpen,
    }
  },
}, initialState)
