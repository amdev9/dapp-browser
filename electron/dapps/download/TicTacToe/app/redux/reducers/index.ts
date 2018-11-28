import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import main from './main';

export interface IState {
  main: any;
}

export default combineReducers({
  main,
});
