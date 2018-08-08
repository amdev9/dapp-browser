import { Action, handleActions } from "redux-actions"
import { RootState } from "app/reducers/state"
import { SearchActions } from "app/actions"

const initialState: RootState.Search = {}

export const searchReducer = handleActions<RootState.Search, any>({
  [SearchActions.Type.CLEAR_SEARCH_SUGGESTS]: (state, action) => {
    return {}
  },

  [SearchActions.Type.PUSH_TO_SEARCH_GROUP]: (state, action: Action<SearchActions.Payload.PushSuggests>) => {
    const { payload } = action

    if (payload) {
      let { items } = payload
      items = items ? items : []

      if (state[payload.name]) {
        state[payload.name] = [
          ...state[payload.name],
          ...items,
        ]
      } else {
        state[payload.name] = items
      }
    }

    return {
      ...state,
    }
  },

  // @todo: add handler for get suggests by action
  [SearchActions.Type.GET_SEARCH_SUGGESTS]: (state, action: Action<SearchActions.Payload.Expression>) => {
    return {
      ...state,
    }
  },

  [SearchActions.Type.UPLOAD_SEARCH_SUGGESTS]: (state, action: Action<RootState.Search>) => {
    const { payload } = action

    if (payload) {
      return {
        ...state,
        ...payload,
      }
    } else {
      return {
        ...state,
      }
    }
  },
}, initialState)
