import { combineReducers } from 'redux';
import counter from './counter';
import notification from './notification';
import tray from './tray';

import { IState } from './state';

const rootReducer = combineReducers<IState>({
  counter,
  notification,
  tray
});

export default rootReducer;