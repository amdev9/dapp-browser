import { Action, handleActions } from "redux-actions"
import { RootState } from "app/reducers/state"
import { KeychainActions } from "app/actions"
import { KeychainItem } from "app/models"
import { Some, None } from "space-lift"
import * as _ from "lodash"

const initialState: RootState.Keychain = {
  keysByItem: [],
  items: {},

  keysBySession: [],
  sessions: {},
}

type PayloadActivateSession = KeychainActions.Payload.ActivateSession
type PayloadUploadSessions = KeychainActions.Payload.UploadSessions
type PayloadCloseSession = KeychainActions.Payload.CloseSession

export const keychainReducer = handleActions<RootState.Keychain, any>({
  [KeychainActions.Type.ACTIVATE_KEYCHAIN_SESSION]: (state, action: Action<PayloadActivateSession>) => {
    const { payload } = action

    if (payload) {
      const sessions = {
        ...state.sessions,
        [payload.app]: Some(payload.session),
      }

      return {
        ...state,
        sessions,
      }
    }

    return {
      ...state,
    }
  },

  [KeychainActions.Type.UPLOAD_KEYCHAIN_SESSIONS]: (state, action: Action<PayloadUploadSessions>) => {
    const { payload } = action

    if (payload) {
      const sessions = {
        ...state.sessions,
        ...payload,
      }

      const keysBySession = _.keys(sessions)

      return {
        ...state,
        keysBySession,
        sessions,
      }
    }

    return {
      ...state,
    }
  },

  [KeychainActions.Type.CLOSE_KEYCHAIN_SESSION]: (state, action: Action<PayloadCloseSession>) => {
    const { payload } = action

    if (payload) {
      const sessions = {
        ...state.sessions,
        [payload]: None,
      }

      const keysBySession = _.keys(sessions)

      return {
        ...state,
        keysBySession,
        sessions,
      }
    }

    return {
      ...state,
    }
  },

  [KeychainActions.Type.UPLOAD_KEYCHAIN_ITEMS]: (state, action: Action<KeychainItem[]>) => {
    const { payload } = action

    if (payload) {
      const items = _.keyBy(payload, (item) => item.name)
      const keysByItem = _.keys(items)

      return {
        ...state,
        keysByItem,
        items,
      }
    }

    return {
      ...state,
    }
  },
}, initialState)
