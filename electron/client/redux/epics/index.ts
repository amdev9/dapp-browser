import 'rxjs';

import { combineEpics, ofType, Epic } from 'redux-observable';
import { delay, mergeMap, mapTo, map, ignoreElements } from 'rxjs/operators';
import { Action, AnyAction } from 'redux';
import { Logger } from '../../Logger';
import * as loggerActions from '../actions/logger';
import * as keychainActions from '../actions/keychain';
import * as constants from '../constants';

import { epics as NotificationEpics } from '../../modules/Notification';
import { epics as IpfsStorageEpics } from '../../modules/IpfsStorage';
import LoaderEpic from './loader';

import { epics as AppsManagerEpics } from '../../modules/AppsManager';

const startCountdownEpic: Epic<Action> = action$ => action$.pipe(
  ofType(constants.INTENT_OPEN_CHANNELS),
  delay(1000), // Asynchronously wait 1000ms then continue
  // mapTo(increment())
);

const loggerWriteEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.LOGGER_WRITE),
  mergeMap(async (action) => {
    try {
      Logger.writeToConsole(action.payload.message);
      return loggerActions.loggerWriteSuccess(action.payload.message, action.meta.sourceUUID);
    } catch (error) {
      return loggerActions.loggerWriteFailure(error, action.meta.sourceUUID);
    }
  }),
);

const keychainCreateSuccessEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.KEYCHAIN_CREATE_SUCCESS),
  mapTo(keychainActions.list()),
);

export const rootEpic = combineEpics(
  // startCountdownEpic
  NotificationEpics,
  IpfsStorageEpics,
  loggerWriteEpic,
  keychainCreateSuccessEpic,
  LoaderEpic,
  AppsManagerEpics,
);
