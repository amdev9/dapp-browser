import StoreSubscriber from '../../classes/internal/StoreSubscriber';
import * as actions from 'MainApp/modules/IpfsStorage/actions';
import * as constants from 'MainApp/modules/IpfsStorage/constants';
import * as models from 'MainApp/modules/IpfsStorage/models';

class IpfsStorage extends StoreSubscriber {
  async downloadIpfsFile(hash: string): Promise<models.IpfsFileEntry> {
    const action = await this.actionPromise({
      onStart: actions.downloadIpfsFile(hash),
      successType: constants.IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS,
      failureType: constants.IPFS_STORAGE_DOWNLOAD_FILE_FAILURE,
    });

    return action.payload.hash;
  }

  async uploadIpfsFile(entry: string): Promise<models.IpfsFileEntry> {
    const action = await this.actionPromise({
      onStart: actions.uploadIpfsFile(entry),
      successType: constants.IPFS_STORAGE_UPLOAD_FILE_SUCCESS,
      failureType: constants.IPFS_STORAGE_UPLOAD_FILE_FAILURE,
    });

    return action.payload.ipfsEntry;
  }
}

export default new IpfsStorage();
