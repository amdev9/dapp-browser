import { AnyAction, Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import * as ipfsStorageActions  from '../actions/ipfsStorage';
import * as constants from '../constants';
import {FileManager, FileObject} from '../FileManager'
import ipfs from '../IpfsStorage'

const fileManager = new FileManager()

const ipfsStorageUploadEpic: Epic<AnyAction> = (action$, state$) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_STORAGE_UPLOAD_FILE),
  switchMap(async (action) => {
    try {
      const fileEntryPath = fileManager.getPathEntries(action.payload.entry)

      console.log('fileEntry', fileEntryPath, action.payload.entry)
      const ipfsFileObject = await ipfs.uploadFile(fileEntryPath)

      const ipfsFile: ipfsStorageActions.IpfsFileEntry = {
        id: action.payload.entry,
        hash: ipfsFileObject.hash
      }

      return ipfsStorageActions.ipfsUploadFilesSuccess(ipfsFile, action.meta.sourceUUID)
    } catch(error){
      return ipfsStorageActions.ipfsUploadFilesFailure(error, action.meta.sourceUUID)
    }
  }),
);

const ipfsStorageDownloadEpic: Epic<AnyAction> = (action$) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_STORAGE_DOWNLOAD_FILE),
  switchMap(async (action) => {
    try {
      console.log('IPFS_STORAGE_DOWNLOAD_FILE', action)
      const targetDirectory = await FileManager.selectDirectory()
      const downloadFile = await ipfs.downloadFile(action.payload.hash)

      const ipfsFileEntry: ipfsStorageActions.IpfsFileEntry = {
        id: FileManager.saveFile(targetDirectory, <FileObject> downloadFile),
        hash: action.payload.hash
      }

      return ipfsStorageActions.ipfsDownloadFileSuccess(ipfsFileEntry, action.meta.sourceUUID)
    } catch(error){
      return ipfsStorageActions.ipfsDownloadFileFailure(error, action.meta.sourceUUID)
    }
  }),
);

export default combineEpics(
  ipfsStorageUploadEpic,
  ipfsStorageDownloadEpic,
)
