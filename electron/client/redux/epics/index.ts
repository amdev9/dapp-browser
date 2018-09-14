import 'rxjs';
 
import { combineEpics, ofType, Epic } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators'; 
import { OPEN_CHANNEL, INTENT_OPEN_CHANNELS } from '../constants';
import { Action } from 'redux';
 
const startCountdownEpic: Epic<Action> = action$ => action$.pipe(
  ofType(INTENT_OPEN_CHANNELS),
  delay(1000), // Asynchronously wait 1000ms then continue
  // mapTo(increment())
);

export const rootEpic = combineEpics(
  // startCountdownEpic
);
