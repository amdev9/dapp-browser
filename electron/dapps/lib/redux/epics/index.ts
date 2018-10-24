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
  map(({ payload }) => {
    utils.insertContentIntoBlock(`${payload.entry.id}:${payload.entry.name}`, 'openDialogButton')
    return actions.uploadIpfsFile(payload.entry.id)
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
  tap((action) => utils.insertContentIntoBlock(action.payload,'networkGetWitnessButton')),
  mapTo(actions.showBlock())
);

const networkBlockCreated: Epic<any> = action$ => action$.pipe(
  ofType(constants.NETWORK_BLOCK_CREATED),
  tap((action) => utils.insertContentIntoBlock(action.payload.block,'networkGetWitnessButton')),
  mapTo(actions.showBlock())
);

const ipfsRoomSendMessageBroadcast: Epic<any> = action$ => action$.pipe(
  ofType(constants.IPFS_ROOM_SEND_MESSAGE_TO_DAPP),
  tap(({ payload }) => {
    utils.appendContentIntoBlock(`[${new Date().toLocaleString()}] ${payload.message.data.toString()}\r\n`,'ipfsRoomLog')
  }),
  mapTo(actions.showBlock())
);

const networkGetWitnessSuccess: Epic<any> = action$ => action$.pipe(
  ofType(constants.NETWORK_GET_WITNESS_SUCCESS),
  tap((action) => utils.insertContentIntoBlock(action.payload,'networkGetWitnessButton')),
  mapTo(actions.showBlock())
);

const keychainCreateSuccess: Epic<any> = action$ => action$.pipe(
  ofType(constants.KEYCHAIN_CREATE_SUCCESS),
  tap((action) => utils.insertContentIntoBlock(JSON.stringify(action.payload),'keychainSignButton')),
  mapTo(actions.keychainShowResult())
);

const keychainCreateFailure: Epic<any> = action$ => action$.pipe(
  ofType(constants.KEYCHAIN_CREATE_FAILURE),
  tap((action) => utils.insertContentIntoBlock(JSON.stringify(action.payload),'keychainSignButton')),
  mapTo(actions.keychainShowResult())
);

const keychainListSuccess: Epic<any> = action$ => action$.pipe(
  ofType(constants.KEYCHAIN_LIST_SUCCESS),
  tap((action) => utils.insertContentIntoBlock(JSON.stringify(action.payload),'keychainSignButton')),
  mapTo(actions.keychainShowResult())
);

const keychainListFailure: Epic<any> = action$ => action$.pipe(
  ofType(constants.KEYCHAIN_LIST_FAILURE),
  tap((action) => utils.insertContentIntoBlock(JSON.stringify(action.payload),'keychainSignButton')),
  mapTo(actions.keychainShowResult())
);

const keychainSignSuccess: Epic<any> = action$ => action$.pipe(
  ofType(constants.KEYCHAIN_SIGN_SUCCESS),
  tap((action) => utils.insertContentIntoBlock(JSON.stringify(action.payload),'keychainSignButton')),
  mapTo(actions.keychainShowResult())
);

const keychainSignFailure: Epic<any> = action$ => action$.pipe(
  ofType(constants.KEYCHAIN_SIGN_FAILURE),
  tap((action) => utils.insertContentIntoBlock(JSON.stringify(action.payload),'keychainSignButton')),
  mapTo(actions.keychainShowResult())
);


export const rootEpic = combineEpics(
  fileManagerOpenSuccess,
  startCountdownEpic,
  uploadFileIpfsStorageSuccess,
  networkGetBlockSuccess,
  ipfsRoomSendMessageBroadcast,
  networkGetWitnessSuccess,
  keychainCreateSuccess,
  keychainCreateFailure,
  keychainListSuccess,
  keychainListFailure,
  keychainSignSuccess,
  keychainSignFailure,
  networkBlockCreated,
);

