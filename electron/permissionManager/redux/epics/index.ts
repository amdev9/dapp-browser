import 'rxjs';
 
import { combineEpics, ofType, Epic } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators'; 
import {  CLOSE_MANAGER } from '../constants';
import { Action } from 'redux';
 
const startCountdownEpic: Epic<Action> = action$ => action$.pipe(
  ofType(CLOSE_MANAGER),
  delay(1000), // Asynchronously wait 1000ms then continue
  // mapTo(increment())
);

export const rootEpic = combineEpics(
  // startCountdownEpic
);
