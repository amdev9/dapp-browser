import { combineReducers } from 'redux';

import { counter, countdown } from './counter';
import * as client from './client';
import * as channel from './channel';

export const rootReducer = combineReducers({
  counter,
  countdown,
  client,
  channel
});

 
