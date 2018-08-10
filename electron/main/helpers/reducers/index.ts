import { combineReducers } from 'redux';
import { counter, countdown } from './counter';
import { channel } from './channel';
import { client } from './client';

export const rootReducer = combineReducers({
  countdown: countdown,
  counter: counter,
  channel: channel,
  client: client
});
