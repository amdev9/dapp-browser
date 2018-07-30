import 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';
 
import { 
  START_COUNTDOWN, 
  INCREMENT_COUNTER,
  INCREMENT_ASYNC, 
  CANCEL_INCREMENT_ASYNC 
} from '../actions/counter'; 
 

const { OPEN_CHANNEL, INTENT_OPEN_CHANNELS, OPEN_CHANNEL_SUCCESS } = require('../actions/channel');

const openChannelSuccess = () => ({ type: OPEN_CHANNEL_SUCCESS });
const increment = () => ({ type: INCREMENT_COUNTER });
const startCountdownEpic = action$ => action$.pipe(
  ofType(OPEN_CHANNEL),
  delay(1000),
  mapTo(increment())
);

export const rootEpic = combineEpics(
  startCountdownEpic
);
