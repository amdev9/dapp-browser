import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap, delay } from 'rxjs/operators';

import * as ipfsStorageActions from '../actions/ipfsStorage';
import * as constants from '../constants';
import { FileManager } from '../FileManager'
// import '../../systemComponents/src/ipfsComponent/ipfs'
// import ipfs from '../IpfsStorage'
//
const fileManager = new FileManager()

const ipfsStorageEpic: Epic<AnyAction> = action$ => action$.pipe( //@todo fix action type
  // ofType(constants.IPFS_STORAGE_UPLOAD_FILES),
  ofType(constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS),
  switchMap(async (action) => {
    try {
      // action.payload.fileEntryIds
      const fileEntries = fileManager.getPathEntries(action.payload)
      const pathArray = fileEntries.map((entry) => entry.path)

      console.log('paths', pathArray, action)
      const result = await ipfs.uploadFiles(pathArray)
      console.log('result', result)

      return ipfsStorageActions.ipfsUploadFilesSuccess(result, action.meta.sourceUUID)
    } catch(error){
      return ipfsStorageActions.ipfsUploadFilesFailure(error, action.meta.sourceUUID)
    }
  }),
);

export default combineEpics(
  ipfsStorageEpic,
)
