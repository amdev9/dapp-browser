import { combineReducers } from 'redux';
import { counter } from './counter';
import { channel } from './channel';
import { client } from './client';

export const rootReducer = combineReducers({
  counter: counter,
  channel: channel,
  client: client
});
