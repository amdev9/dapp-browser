import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';

import * as ipfsStorageActions from './actions';
import * as constants from './constants';
import * as models from './models';
import * as clientConstants from 'ClientApp/modules/IpfsStorage/constants';
import * as clientActions from 'ClientApp/modules/IpfsStorage/actions';
import { component as FileManager, models as FileManagerModels } from '../FileManager';
import ipfs from './component';

const ipfsStorageClientUploadEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(clientConstants.CLIENT_IPFS_STORAGE_UPLOAD_FILE),
  mergeMap(async (action) => {
    const { uid } = action.meta

    try {
      const file = await ipfs.uploadFileWithSendStatus(action.payload.path);

      if (!file) {
        throw Error('Ipfs file object is empty');
      }

      return clientActions.ipfsStorageUploadFileSuccess(file.hash, uid);
    } catch (error) {
      return clientActions.ipfsStorageUploadFileFailure(error, uid);
    }
  }),
);

const ipfsStorageUploadEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.IPFS_STORAGE_UPLOAD_FILE),
  mergeMap(async (action) => {
    const { entry } = action.payload;
    const { uid } = action.meta;

    try {
      if (!entry) {
        throw Error('File entry is incorrect');
      }

      const filePath = FileManager.getPath(entry);

      if (!filePath) {
        throw Error('File path with current entry does not exist');
      }

      const ipfsFileObject = await ipfs.uploadFileWithSendStatus(filePath);

      if (!ipfsFileObject) {
        throw Error('Ipfs file object is empty');
      }

      const ipfsFile: models.IpfsFileEntry = {
        id: entry,
        hash: ipfsFileObject.hash,
      };

      return ipfsStorageActions.uploadIpfsFileSuccess(ipfsFile, uid, action.meta.sourceUUID);
    } catch (error) {
      return ipfsStorageActions.uploadIpfsFileFailure(error, uid, action.meta.sourceUUID);
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
      const ipfsFileEntry: models.IpfsFileEntry = {
        id: savedFile,
        hash: action.payload.hash,
      };

      return ipfsStorageActions.downloadIpfsFileSuccess(ipfsFileEntry, action.meta.uid, action.meta.sourceUUID);
    } catch (error) {
      return ipfsStorageActions.downloadIpfsFileFailure(error, action.meta.uid, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  ipfsStorageUploadEpic,
  ipfsStorageDownloadEpic,
  ipfsStorageClientUploadEpic,
);
