import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';

import * as ipfsStorageActions from './actions';
import * as constants from './constants';
import * as clientConstants from 'ClientApp/modules/IpfsStorage/constants';
import * as clientActions from 'ClientApp/modules/IpfsStorage/actions';
import { component as FileManager, models as FileManagerModels } from '../FileManager';
import ipfs from './component';
import StoreManager from '../../helpers/systemComponents/StoreManager';

const ipfsStorageClientUploadEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(clientConstants.CLIENT_IPFS_STORAGE_UPLOAD_FILE),
  mergeMap(async (action) => {
    try {
      console.log('ipfsStorage before', action);
      const progressCallback = action.payload.progress ? (percent: number) => {
        console.log('progress main', percent, clientActions.ipfsStorageUploadFileStatus(percent, action.meta.uid));
        StoreManager.store.dispatch(clientActions.ipfsStorageUploadFileStatus(percent, action.meta.uid));
      } : null;

      const file = await ipfs.uploadFile(action.payload.path, progressCallback);
      console.log('ipfsStorage', file);
      return clientActions.ipfsStorageUploadFileSuccess(file.hash, action.meta.uid);
    } catch (error) {
      return clientActions.ipfsStorageUploadFileFailure(error, action.meta.uid);
    }
  }),
);

const ipfsStorageUploadEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.IPFS_STORAGE_UPLOAD_FILE),
  mergeMap(async (action) => {
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
  mergeMap(async (action) => {
    try {
      const targetDirectory = await FileManager.selectDirectory();
      const downloadFile = await ipfs.downloadFile(action.payload.hash);

      if (!downloadFile) {
        throw Error('File with current hash does not exist');
      }

      const savedFile = await FileManager.saveFile(targetDirectory, <FileManagerModels.FileObject> downloadFile);
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
  ipfsStorageClientUploadEpic,
);
