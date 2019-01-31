import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { mergeMap, map, filter } from 'rxjs/operators';
import { race, defer } from 'rxjs';
import * as path from 'path';

import * as ipfsStorageActions from './actions';
import * as constants from './constants';
import * as models from './models';
import * as utils from './utils';
import * as clientConstants from 'ClientApp/modules/IpfsStorage/constants';
import * as clientActions from 'ClientApp/modules/IpfsStorage/actions';
import * as AppsManagerConstants from '../AppsManager/constants';

const ipfsStorageClientUploadEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(clientConstants.CLIENT_IPFS_STORAGE_UPLOAD_FILE),
  mergeMap(async (action) => {
    const { uid, name } = action.meta;
    const { path } = action.payload;

    try {
      const upload = await utils.uploadFileWithSendStatus({
        uid,
        path,
        dappName: name,
      });

      const ipfsFile = await upload.file;
      if (!ipfsFile) {
        throw Error('Ipfs file object is empty');
      }

      return clientActions.ipfsStorageUploadFileSuccess(ipfsFile.hash, uid);
    } catch (error) {
      return clientActions.ipfsStorageUploadFileFailure(error, uid);
    }
  }),
);

const ipfsStorageUploadEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.IPFS_STORAGE_UPLOAD_FILE),
  mergeMap((action: AnyAction) =>
    race(
      defer(async () => {
        const { entry } = action.payload;
        const { uid, name } = action.meta;

        try {
          const filePath = utils.getPathFromFileEntry(entry);

          const upload = await utils.uploadFileWithSendStatus({
            uid,
            dappName: name,
            path: filePath,
          });

          const ipfsFileObject = await upload.file;

          if (!ipfsFileObject) {
            throw Error('Ipfs file object is empty');
          }

          const ipfsFile: models.IpfsFileEntry = {
            id: uid,
            hash: ipfsFileObject.hash,
            fileName: path.basename(filePath),
          };

          return ipfsStorageActions.uploadIpfsFileSuccess(ipfsFile, uid, action.meta.sourceUUID);
        } catch (error) {
          return ipfsStorageActions.uploadIpfsFileFailure(error, uid, action.meta.sourceUUID);
        }
      }),
      action$.pipe(
        ofType(AppsManagerConstants.ON_DAPP_CLOSE),
        filter((dappCloseAction: AnyAction) => action.meta.name === dappCloseAction.payload.dappName),
        map((dappCloseAction: AnyAction) => {
          try {
            utils.ActiveLoads.removeActiveUploadsByDappName(action.meta.name);
          } catch (err) {
            console.log(err);
          }
          return ipfsStorageActions.uploadIpfsFileFailure('Dapp has been closed', action.meta.uid, action.meta.sourceUUID);
        }),
      ),
    )),
);

const ipfsStorageDownloadWithCancellingEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.IPFS_STORAGE_DOWNLOAD_FILE),
  mergeMap((action: AnyAction) =>
    race(
      defer(async () => {
        const { hash } = action.payload;
        const { uid, name } = action.meta;

        try {
          const download = await utils.downloadFile({ hash, uid, dappName: name });
          const savedFile = await download.file;

          const ipfsFileEntry: models.IpfsFileEntry = {
            hash,
            id: uid,
            fileName: savedFile.name,
          };

          return ipfsStorageActions.downloadIpfsFileSuccess(ipfsFileEntry, uid, action.meta.sourceUUID);
        } catch (error) {
          return ipfsStorageActions.downloadIpfsFileFailure(error, uid, action.meta.sourceUUID);
        }
      }),
      action$.pipe(
        ofType(AppsManagerConstants.ON_DAPP_CLOSE),
        filter((dappCloseAction: AnyAction) => action.meta.name === dappCloseAction.payload.dappName),
        map((dappCloseAction: AnyAction) => {
          try {
            utils.ActiveLoads.removeActiveDownloadsByDappName(action.meta.name);
          } catch (err) {
            console.log(err);
          }
          return ipfsStorageActions.downloadIpfsFileFailure('Dapp has been closed', action.meta.uid, action.meta.sourceUUID);
        }),
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
  stopDownloadingEpic,
);
