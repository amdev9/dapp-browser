import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap, delay } from 'rxjs/operators';

import * as fileManagerActions from '../actions/fileManager';
import * as constants from '../constants';
import { FileManager } from '../FileManager'
import '../../systemComponents/src/ipfsComponent/ipfs'

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
      // ipfs.uploadFiles(pathArray)
      // const idsArray = await fileManagerInstance.showOpenDialog()
      // return fileManagerActions.openDialogSuccess(idsArray, action.meta.sourceUUID)
      return { type: 'ipfs'}
    } catch(error){
      return fileManagerActions.openDialogFailure(error, action.meta.sourceUUID)
    }
  }),
);

export default combineEpics(
  ipfsStorageEpic,
)
