import { combineReducers } from 'redux';
import counter from './counter';
import notification from './notification';
//todo add tray reducer
import { IState } from './state';

const rootReducer = combineReducers<IState>({
  counter,
  notification
});

export default rootReducer;