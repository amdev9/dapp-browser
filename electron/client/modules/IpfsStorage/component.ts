import * as uuid from 'uuid/v4';

import StoreManager from '../StoreManager/component';
import * as actions from './actions';
import * as constants from './constants';

export default class IpfsStorage extends StoreManager {
  static async uploadFile(path: string, progressHandler?: ((percent: number) => void) | null) {
    const uid = uuid();
    let statusSubscriber;

    if (progressHandler) {
      statusSubscriber = this.subscribeUIDActions({
        uid,
        actionTypes: constants.CLIENT_IPFS_STORAGE_UPLOAD_FILE_STATUS,
        callback: (action) => {
          progressHandler(action.payload.progress);
        },
      });
    }

    await this.actionPromise({
      onStart: actions.ipfsStorageUploadFile(path, Boolean(progressHandler)),
      successType: constants.CLIENT_IPFS_STORAGE_UPLOAD_FILE_SUCCESS,
      failureType: constants.CLIENT_IPFS_STORAGE_UPLOAD_FILE_FAILURE,
    }, uid);

    statusSubscriber && statusSubscriber();
  }

  static async downloadFile(hash: string) {
    return this.actionPromise({
      onStart: actions.ipfsStorageDownloadFile(hash),
      successType: constants.CLIENT_IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS,
      failureType: constants.CLIENT_IPFS_STORAGE_DOWNLOAD_FILE_FAILURE,
    });
  }
}
