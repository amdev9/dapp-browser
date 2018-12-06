import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import * as ipfsStorageActions from './actions';
import * as constants from './constants';
import { FileManager, FileObject } from '../FileManager/index';
import ipfs from './component';

const ipfsStorageUploadEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.IPFS_STORAGE_UPLOAD_FILE),
  switchMap(async (action) => {
    try {
      const filePath = FileManager.getPath(action.payload.entry);

      const ipfsFileObject = await ipfs.uploadFile(filePath);

      if (!ipfsFileObject) {
        throw Error('Ipfs file object is empty');
      }

      const ipfsFile: ipfsStorageActions.IpfsFileEntry = {
        id: action.payload.entry,
        hash: ipfsFileObject.hash,
      };

      return ipfsStorageActions.uploadIpfsFileSuccess(ipfsFile, action.meta.sourceUUID);
    } catch (error) {
      return ipfsStorageActions.uploadIpfsFileFailure(error, action.meta.sourceUUID);
    }
  }),
);

const ipfsStorageDownloadEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.IPFS_STORAGE_DOWNLOAD_FILE),
  switchMap(async (action) => {
    try {
      const targetDirectory = await FileManager.selectDirectory();
      const downloadFile = await ipfs.downloadFile(action.payload.hash);

      if (!downloadFile) {
        throw Error('File with current hash does not exist');
      }

      const savedFile = await FileManager.saveFile(targetDirectory, <FileObject> downloadFile);
      const ipfsFileEntry: ipfsStorageActions.IpfsFileEntry = {
        id: savedFile,
        hash: action.payload.hash,
      };

      return ipfsStorageActions.downloadIpfsFileSuccess(ipfsFileEntry, action.meta.sourceUUID);
    } catch (error) {
      return ipfsStorageActions.downloadIpfsFileFailure(error, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  ipfsStorageUploadEpic,
  ipfsStorageDownloadEpic,
);
