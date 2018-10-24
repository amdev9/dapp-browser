import { combineReducers } from 'redux';

import { channel } from './channel';
import { client } from './client';
import { feed } from './feed';
import { tray } from './tray';
import { permissionManager } from './permissionManager';
import { IState } from './state';

export const rootReducer = combineReducers<IState>({
  channel,
  client,
  feed,
  tray,
  permissionManager,
});
