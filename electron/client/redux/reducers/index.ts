import { combineReducers } from 'redux';
import counter from './counter';
import notification from './notification';
import loader from './loader';
import statusBar from './status-bar';
import settings from './settings';
import tray from './tray';
import feed from './feed';
import { IState } from './state';

const rootReducer = combineReducers<IState>({
  counter,
  notification,
  loader,
  statusBar,
  settings,
  tray,
  feed
});

export default rootReducer;
