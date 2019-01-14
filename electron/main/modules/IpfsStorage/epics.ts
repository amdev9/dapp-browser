import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { mergeMap, map, take, takeUntil, filter, mapTo } from 'rxjs/operators';
import { Observable, race, from, Observer } from 'rxjs';
import * as path from 'path';

import * as ipfsStorageActions from './actions';
import * as constants from './constants';
import * as models from './models';
import * as utils from './utils';
import * as clientConstants from 'ClientApp/modules/IpfsStorage/constants';
import * as clientActions from 'ClientApp/modules/IpfsStorage/actions';
import { component as FileManager, models as FileManagerModels } from '../FileManager';
import ipfs from './component';
import * as AppsManagerConstants from '../AppsManager/constants';

const ipfsStorageClientUploadEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(clientConstants.CLIENT_IPFS_STORAGE_UPLOAD_FILE),
  mergeMap(async (action) => {
    const { uid } = action.meta;

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

const uploadingFilePromise = (action: AnyAction): Promise<AnyAction> => new Promise(async (resolve, reject) => {
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
      id: uid,
      hash: ipfsFileObject.hash,
      fileName: path.basename(filePath),
    };

    resolve(ipfsStorageActions.uploadIpfsFileSuccess(ipfsFile, uid, action.meta.sourceUUID));
  } catch (error) {
    reject(ipfsStorageActions.uploadIpfsFileFailure(error, uid, action.meta.sourceUUID));
  }
});

const ipfsStorageUploadEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.IPFS_STORAGE_UPLOAD_FILE),
  mergeMap((action) =>
  race(
    from(uploadingFilePromise(action)),
    action$.pipe(
      ofType(AppsManagerConstants.ON_DAPP_CLOSE),
      filter((dappCloseAction: AnyAction) => dappCloseAction.payload.dappName === action.meta.name),
      map((dappCloseAction: AnyAction) => ipfsStorageActions.uploadIpfsFileFailure('Dapp has been closed', action.meta.uid, action.meta.sourceUUID)),
    ),
  )),
);

const downloadingFilePromise = (action: AnyAction): Promise<AnyAction> => new Promise(async (resolve, reject) => {
  const { hash } = action.payload;
  const { uid } = action.meta;

  try {
    const targetDirectory = await FileManager.selectDirectory();
    if (!targetDirectory) {
      throw Error('Directory has not been selected');
    }
    const downloadFileEntry = await utils.beforeDownloadFileHookClient(hash);
    const downloadFile = await ipfs.downloadFile(hash);

    if (!downloadFile) {
      throw Error('File with current hash does not exist');
    }

    const savedFile = await FileManager.saveFile(targetDirectory, <FileManagerModels.FileObject> downloadFile);
    await utils.afterDownloadFileHookClient(downloadFileEntry, {
      path: savedFile.path,
      name: savedFile.name,
      size: savedFile.size,
    });

    const ipfsFileEntry: models.IpfsFileEntry = {
      hash,
      id: uid,
      fileName: savedFile.name,
    };

    resolve(ipfsStorageActions.downloadIpfsFileSuccess(ipfsFileEntry, uid, action.meta.sourceUUID));
  } catch (error) {
    reject(ipfsStorageActions.downloadIpfsFileFailure(error, uid, action.meta.sourceUUID));
  }
});

const ipfsStorageDownloadWithCancellingEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.IPFS_STORAGE_DOWNLOAD_FILE),
  mergeMap((action: AnyAction) =>
    race(
      from(downloadingFilePromise(action)),
      action$.pipe(
        ofType(AppsManagerConstants.ON_DAPP_CLOSE),
        filter((dappCloseAction: AnyAction) => dappCloseAction.payload.dappName === action.meta.name),
        map((dappCloseAction: AnyAction) => ipfsStorageActions.downloadIpfsFileFailure('Dapp has been closed', action.meta.uid, action.meta.sourceUUID)),
      ),
    ),
  ),
);

const stopUploadingEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.IPFS_STORAGE_UPLOAD_FILE_FAILURE),
  map((action: AnyAction) => clientActions.uploadsListEntrySetError(action.meta.uid, action.payload.error))
);

const stopDownloadingEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.IPFS_STORAGE_DOWNLOAD_FILE_FAILURE),
  map((action: AnyAction) => clientActions.downloadListEntrySetError(action.meta.uid, action.payload.error))
);

export default combineEpics(
  ipfsStorageUploadEpic,
  ipfsStorageClientUploadEpic,
  ipfsStorageDownloadWithCancellingEpic,
  stopUploadingEpic,
  stopDownloadingEpic
);
