import { combineReducers } from 'redux';
 
import { channel } from './channel';
import { client } from './client';
import { IState } from './state';

export const rootReducer = combineReducers<IState>({
  channel: channel,
  client: client
});