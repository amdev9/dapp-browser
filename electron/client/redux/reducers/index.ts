import { combineReducers } from 'redux';
import counter from './counter';
import notification from './notification';
import statusBar from './status-bar';
import tray from './tray';

import { IState } from './state';

const rootReducer = combineReducers<IState>({
  counter,
  notification,
  statusBar,
  tray
});

export default rootReducer;