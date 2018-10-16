import 'rxjs';
import { combineEpics, ofType, Epic } from 'redux-observable';
import { mapTo, tap, map, mergeMap } from 'rxjs/operators';

import * as actions from '../actions/channel';
import * as constants from '../constants';
import * as utils from '../utils'

const openChannelSuccess = () => ({ type: constants.OPEN_CHANNEL_SUCCESS });

const startCountdownEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.OPEN_CHANNEL),
  mapTo(openChannelSuccess())
);

const fileManagerOpenSuccess: Epic<any> = action$ => action$.pipe(
  ofType(constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS),
  map((action) => {
    utils.insertContentIntoBlock(action.payload.entry, 'openDialogButton')
    return actions.uploadFilesIpfsStorage(action.payload.entry)
  }),
);

const uploadFileIpfsStorageSuccess: Epic<any> = action$ => action$.pipe(
  ofType(constants.IPFS_STORAGE_UPLOAD_FILE_SUCCESS),
  tap((action) =>
    utils.insertContentIntoBlock(`${action.payload.ipfsEntry.id}:${action.payload.ipfsEntry.hash}`, 'openDialogButton')
  ),
  mapTo(actions.showFileEntries())
);

const networkGetBlockSuccess: Epic<any> = action$ => action$.pipe(
  ofType(constants.NETWORK_GET_BLOCK_SUCCESS),
  tap((action) => utils.insertContentIntoBlock(action.payload,'networkGetBlockButton')),
  mapTo(actions.showBlock())
);


export const rootEpic = combineEpics(
  fileManagerOpenSuccess,
  startCountdownEpic,
  uploadFileIpfsStorageSuccess,
  networkGetBlockSuccess,
);

