import { combineReducers, ReducersMapObject } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import * as constants from '../constants';

interface InitialState {
  chatList: [];
  selectedChat: string | null;
}

const initialState: InitialState = {
  chatList: [],
  selectedChat: null,
}

const main = (state: InitialState = initialState, action: any) => {
  switch (action.type) {

    case constants.SET_ROOM_NAME:
      return {
        ...state,
        selectedRoom: action.payload.roomName,
      }

    default:
      return state;
  }
};

export default combineReducers({
  main,
  routing: routerReducer,
  form: formReducer,
});
