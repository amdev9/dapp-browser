import { combineReducers } from 'redux';

import notification from './notification';
import loader from './loader';
import search from './search';
import statusBar from './status-bar';

import tray from './tray';
import feed from './feed';
import permissions from './permissions';
import isHome from './is-home';
import window from './window';
import activeDapp from './active-dapp';
import isOpen from './is-open';

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
  permissions,
  isOpen,
});

export default rootReducer;
