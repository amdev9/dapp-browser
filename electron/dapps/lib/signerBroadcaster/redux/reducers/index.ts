import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as constants from '../constants';

interface InitialState {
  chatList: [];
  selectedRoom: string | null;
  appInit: boolean;
}

const initialState: InitialState = {
  chatList: [],
  selectedRoom: null,
  appInit: false,
};

const main = (state: InitialState = initialState, action: any) => {
  switch (action.type) {

    case constants.SET_ROOM_NAME:
      return {
        ...state,
        selectedRoom: action.payload.roomName,
      };

    case constants.INIT_APP:
      return {
        ...state,
        appInit: true,
      };

    default:
      return state;
  }
};

export default combineReducers({
  main,
  form: formReducer,
});
