import { combineReducers } from 'redux';
 
import notification from './notification';
import loader from './loader';
import statusBar from './status-bar';
 
import tray from './tray';
import feed from './feed';
import { IState } from './state';

const rootReducer = combineReducers<IState>({
  notification,
  loader,
  statusBar,
  tray,
  feed
});

export default rootReducer;
