import 'rxjs';
 
import { combineEpics, ofType, Epic } from 'redux-observable';
import { delay, switchMap } from 'rxjs/operators'; 
import { OPEN_CHANNEL, INTENT_OPEN_CHANNELS } from '../constants';
import { Action } from 'redux';

const startCountdownEpic: Epic<Action> = action$ => action$.pipe(
  ofType(INTENT_OPEN_CHANNELS),
  delay(1000), // Asynchronously wait 1000ms then continue
  // mapTo(increment())
);

import { AnyAction } from 'redux';
import { Logger } from '../../Logger';
import * as loggerActions from '../actions/logger';
import * as constants from '../constants';

const loggerWriteEpic: Epic<AnyAction> = action$ => action$.pipe( //@todo fix action type
  ofType(constants.LOGGER_WRITE),
  switchMap(async (action) => {
    try {
      Logger.writeToConsole(action.payload.message);
      return loggerActions.loggerWriteSuccess(action.payload.message, action.meta.sourceUUID)
    } catch(error) {
      return loggerActions.loggerWriteFailure(error, action.meta.sourceUUID)
    }
  }),
);

export const rootEpic = combineEpics(
  // startCountdownEpic
  loggerWriteEpic
);
