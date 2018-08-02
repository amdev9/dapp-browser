import { createAction } from "redux-actions"
import { RootState } from "app/reducers"
import { SearchItem } from "app/models"

export namespace SearchActions {
  export enum Type {
    UPLOAD_SEARCH_SUGGESTS = "UPLOAD_SEARCH_SUGGESTS",
    CLEAR_SEARCH_SUGGESTS = "CLEAR_SEARCH_SUGGESTS",
    PUSH_TO_SEARCH_GROUP = "PUSH_TO_SEARCH_GROUP",
    GET_SEARCH_SUGGESTS = "GET_SEARCH_SUGGESTS",
  }

  export namespace Payload {
    export type Expression = string

    export interface PushSuggests {
      items?: SearchItem[]
      name: string
    }
  }

  // @todo: next need replace it with handle by search middleware
  export const pushSuggests = createAction<Payload.PushSuggests>(Type.PUSH_TO_SEARCH_GROUP)
  export const uploadSuggests = createAction<RootState.Search>(Type.UPLOAD_SEARCH_SUGGESTS)
  export const getSuggests = createAction<Payload.Expression>(Type.GET_SEARCH_SUGGESTS)
  export const clear = createAction(Type.CLEAR_SEARCH_SUGGESTS)
}
