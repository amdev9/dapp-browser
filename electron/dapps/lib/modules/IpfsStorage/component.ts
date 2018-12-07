import StoreSubscriber from '../../classes/internal/StoreSubscriber';
import * as actions from 'MainApp/modules/IpfsStorage/actions';
import * as constants from 'MainApp/modules/IpfsStorage/constants';

class IpfsStorage extends StoreSubscriber {
  downloadIpfsFile(hash: string) {
    return this.actionPromise({
      onStart: actions.downloadIpfsFile(hash),
      successType: constants.IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS,
      failureType: constants.IPFS_STORAGE_DOWNLOAD_FILE_FAILURE,
    });
  }
  uploadIpfsFile(entry: string) {
    return this.actionPromise({
      onStart: actions.uploadIpfsFile(entry),
      successType: constants.IPFS_STORAGE_UPLOAD_FILE_SUCCESS,
      failureType: constants.IPFS_STORAGE_UPLOAD_FILE_FAILURE,
    });
  }
}

export default new IpfsStorage();
