import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, mergeMap } from 'rxjs/operators';

import * as mainConstants from 'MainApp/modules/AppsManager/constants';
import * as actions from './actions';
import * as utils from './utils';

const onUploadFile: Epic<AnyAction> = action$ => action$.pipe(
  ofType(mainConstants.CLIENT_IPFS_STORAGE_UPLOAD_FILE),
  mergeMap((action) => {
    console.log('client_upload_okay!');
    // const entry = utils.createUploadsFileEntry();
    // actions.uploadsListEntryAdd()
  }),
  ignoreElements()
);

const onUploadFileSuccess: Epic<AnyAction> = action$ => action$.pipe(
  ofType(mainConstants.CLIENT_IPFS_STORAGE_UPLOAD_SUCCESS),
  mergeMap((action) => {


  })
);

const onUploadFileFailure: Epic<AnyAction> = action$ => action$.pipe(
  ofType(mainConstants.CLIENT_IPFS_STORAGE_UPLOAD_FAILURE),
  mergeMap((action) => {


  })
);


const onUpdateProgressUploadFile: Epic<AnyAction> = action$ => action$.pipe(
  ofType(mainConstants.CLIENT_IPFS_STORAGE_UPLOAD_FAILURE),
  mergeMap((action) => {


  })
);

export default combineEpics(
  onUploadFile,
  // onUploadFileSuccess,
  // onUploadFileFailure,
  // onUpdateProgressUploadFile,
);
