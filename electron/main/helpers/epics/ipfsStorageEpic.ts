import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import * as ipfsStorageActions from '../actions/ipfsStorage';
import * as constants from '../constants';
import { FileManager } from '../FileManager'
import ipfs from '../IpfsStorage'

const fileManager = new FileManager()

const ipfsStorageUploadEpic: Epic<AnyAction> = (action$, state$) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_STORAGE_UPLOAD_FILES),
  switchMap(async (action) => {
    try {
      const fileEntries = fileManager.getPathEntries(action.payload)
      const pathArray = fileEntries.map((entry) => entry.path)

      const ipfsFileObjectList = await ipfs.uploadFiles(pathArray)

      const resultIpfsFileObjects = fileEntries.map((fileEntry) => {
        const foundIpfsFileObject = ipfsFileObjectList.find((item) => item.path === fileEntry.path)

        if (!foundIpfsFileObject){
          return
        }

        return {
          id: fileEntry.id,
          hash: foundIpfsFileObject.hash,
        }
      })

      return ipfsStorageActions.ipfsUploadFilesSuccess(resultIpfsFileObjects, action.meta.sourceUUID)
    } catch(error){
      return ipfsStorageActions.ipfsUploadFilesFailure(error, action.meta.sourceUUID)
    }
  }),
);

export default combineEpics(
  ipfsStorageUploadEpic,
)
