import 'rxjs';
import { combineEpics, ofType, Epic } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';
import { Action } from 'redux';

import { OPEN_CHANNEL, INTENT_OPEN_CHANNELS, OPEN_CHANNEL_SUCCESS } from '../actions/channel';

const openChannelSuccess = () => ({ type: OPEN_CHANNEL_SUCCESS });
 
const startCountdownEpic: Epic<Action> = action$ => action$.pipe(
  ofType(OPEN_CHANNEL),
  mapTo(openChannelSuccess())
);

export const rootEpic = combineEpics(
  startCountdownEpic
);

//@todo add epic for channelId map save, add sendDataChannel with channelId