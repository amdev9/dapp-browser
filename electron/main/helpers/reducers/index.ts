import { combineReducers } from 'redux';

import { counter, countdown } from './counter';
import * as client from './client';
import * as channel from './channel'; // ChannelState

export type RootState = {
  client: WeatherState;
  channel: ChannelState;
};

export const rootReducer = combineReducers({
  // counter,
  // countdown,
  client: client,
  channel: channel
});

 
