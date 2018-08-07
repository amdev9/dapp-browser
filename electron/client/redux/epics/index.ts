import 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators'; 
import { OPEN_CHANNEL, INTENT_OPEN_CHANNELS, INCREMENT_COUNTER } from '../constants';

const increment = () => ({ type: INCREMENT_COUNTER });
const startCountdownEpic = action$ => action$.pipe(
  ofType(INTENT_OPEN_CHANNELS),
  delay(1000), // Asynchronously wait 1000ms then continue
  // mapTo(increment())
);

export const rootEpic = combineEpics(
  // startCountdownEpic
);
