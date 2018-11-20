import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as constants from '../constants';

interface InitialState {
  appInit: boolean;
}

const initialState: InitialState = {
  appInit: false,
};

const main = (state: InitialState = initialState, action: any) => {
  switch (action.type) {

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
