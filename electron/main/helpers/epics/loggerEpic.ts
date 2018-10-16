import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { Logger } from '../Logger'
import * as loggerActions from '../actions/loggerActions';
import * as constants from '../constants';


const loggerInstance = new Logger();

const loggerWriteEpic: Epic<AnyAction> = action$ => action$.pipe( //@todo fix action type
  ofType(constants.LOGGER_WRITE),
  switchMap(async (action) => {
    try {
      const message = await loggerInstance.writeToConsole(action.payload.message);
      return loggerActions.loggerWriteSuccess(message, action.meta.sourceUUID)
    } catch(error) {
      return loggerActions.loggerWriteFailure(error, action.meta.sourceUUID)
    }
  }),
);

export default combineEpics(
  loggerWriteEpic,
)
