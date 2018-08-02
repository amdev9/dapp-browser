import { /* Action, */ handleActions } from "redux-actions"
import { RootState } from "app/reducers/state"
// import { CommonActions } from "app/actions"
// import * as _ from "lodash"

const initialState: RootState.Common = {
  title: "Home",
  locale: "en",
}

export const commonReducer = handleActions<RootState.Common, any>({

}, initialState)
