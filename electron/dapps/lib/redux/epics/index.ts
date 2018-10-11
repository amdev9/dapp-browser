import 'rxjs';
import { combineEpics, ofType, Epic } from 'redux-observable';
import { delay, mapTo, tap } from 'rxjs/operators';
import { Action } from 'redux';

import * as actions from '../actions/channel';
import * as utils from '../utils'

const openChannelSuccess = () => ({ type: actions.OPEN_CHANNEL_SUCCESS });

const startCountdownEpic: Epic<Action> = action$ => action$.pipe(
  ofType(actions.OPEN_CHANNEL),
  mapTo(openChannelSuccess())
);

const fileManagerOpenSuccess: Epic<Action> = action$ => action$.pipe(
  ofType(actions.FILE_MANAGER_OPEN_DIALOG_SUCCESS),
  tap((action) => utils.insertContentIntoBlock(action.payload && action.payload.join(' '))),
  mapTo(actions.showFileEntries())
);

// const fileManagerOpenFailure: Epic<Action> = action$ => action$.pipe(
//   ofType(actions.FILE_MANAGER_OPEN_DIALOG_FAILURE),
//   mapTo({ type: 'ANYTHING'})
// );

export const rootEpic = combineEpics(
  startCountdownEpic,
  fileManagerOpenSuccess,
  // fileManagerOpenFailure
);

//@todo add epic for channelId map save, add sendDataChannel with channelId
