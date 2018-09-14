import 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';
 

const { OPEN_CHANNEL, INTENT_OPEN_CHANNELS, OPEN_CHANNEL_SUCCESS } = require('../actions/channel');

const openChannelSuccess = () => ({ type: OPEN_CHANNEL_SUCCESS });
 
const startCountdownEpic = action$ => action$.pipe(
  ofType(OPEN_CHANNEL),
  mapTo(openChannelSuccess())
);

export const rootEpic = combineEpics(
  startCountdownEpic
);
