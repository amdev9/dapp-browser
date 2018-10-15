import 'rxjs';
import { combineEpics, ofType, Epic } from 'redux-observable';
import { delay, mapTo, tap } from 'rxjs/operators';
import { Action } from 'redux';

import * as actions from '../actions/channel';
import * as utils from '../utils'

const openChannelSuccess = () => ({ type: actions.OPEN_CHANNEL_SUCCESS });

const startCountdownEpic: Epic<any> = action$ => action$.pipe(
  ofType(actions.OPEN_CHANNEL),
  mapTo(openChannelSuccess())
);

const fileManagerOpenSuccess: Epic<any> = action$ => action$.pipe(
  ofType(actions.FILE_MANAGER_OPEN_DIALOG_SUCCESS),
  tap((action) => utils.insertContentIntoBlock(action.payload && action.payload.join(',\r\n'), 'openDialogButton')), 
  mapTo(actions.showFileEntries()) 
);

const networkGetBlockSuccess: Epic<any> = action$ => action$.pipe(
  ofType(actions.NETWORK_GET_BLOCK_SUCCESS),
  tap((action) => utils.insertContentIntoBlock(action.payload,'networkGetBlockButton')),
  mapTo(actions.showBlock())
);

export const rootEpic = combineEpics(
  startCountdownEpic,
  fileManagerOpenSuccess,
  // fileManagerOpenFailure
  networkGetBlockSuccess,
);
