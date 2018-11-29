import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import main from './main';

export interface IState {
  main: any;
}

export default combineReducers({
  main,
  form: formReducer,
});
