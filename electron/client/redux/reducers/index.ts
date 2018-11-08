import { combineReducers } from 'redux';

import notification from './notification';
import loader from './loader';
import statusBar from './status-bar';

import tray from './tray';
import feed from './feed';
import search from './search';
import settings from './settings';
import permissions from './permissions';
import isHome from './is-home';
import window from './window';
import activeDapp from './active-dapp';

import { IState } from './state';

const rootReducer = combineReducers<IState>({
  isHome,
  activeDapp,
  window,
  notification,
  loader,
  statusBar,
  tray,
  feed,
  search,
  settings,
  permissions,
});

export default rootReducer;
