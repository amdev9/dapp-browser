import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { counter, countdown } from './counter';
import * as client from './client';
import * as channel from './channel'; // ChannelState

export const rootReducer = combineReducers({
  client: client,
  channel: channel
});

export type RootState = StateType<typeof rootReducer>;

 
