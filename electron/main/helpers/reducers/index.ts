import { combineReducers } from 'redux';
import { counter } from './counter';
import { channel } from './channel';
import { client } from './client';
import { IState } from './state';

export const rootReducer = combineReducers<IState>({
  counter: counter,
  channel: channel,
  client: client
});
