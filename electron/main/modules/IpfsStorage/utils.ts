import * as pathModule from 'path';
import { promises as fs, createReadStream } from 'fs';

import * as IpfsStorageUtils from 'ClientApp/modules/IpfsStorage/utils';
import * as IpfsStorageActions from 'ClientApp/modules/IpfsStorage/actions';
import * as IpfsStorageModels from 'ClientApp/modules/IpfsStorage/models';

import StoreManager from '../../helpers/systemComponents/StoreManager';
import IpfsStorage from './component';
import * as actions from './actions';
import { component as FileManager, models as FileManagerModels } from '../FileManager';
import { component as DappComponent } from '../Dapp';
import * as models from './models';

export const getPathFromFileEntry = (entry: string) => {
  if (!entry) {
    throw Error('File entry is incorrect');
  }

  const filePath = FileManager.getPath(entry);

  if (!filePath) {
    throw Error('File path with current entry does not exist');
  }

  return filePath;
};

export const getIpfsFileEntry = async (path: string): Promise<IpfsStorageModels.IpfsFileEntry> => {
  const name = pathModule.basename(path);
  const stats = await fs.lstat(path);

  return {
    path,
    name,
    size: stats.size,
  };
};

export const beforeDownloadFileHookClient = async (hash: string, uid: string = ''): Promise<IpfsStorageModels.DownloadFileEntry> => {
  const fileEntry = IpfsStorageUtils.createDownloadFileEntry(hash, uid);

  StoreManager.store.dispatch(IpfsStorageActions.downloadListEntryAdd(fileEntry));

  return fileEntry;
};

export const afterDownloadFileHookClient = (entry: IpfsStorageModels.DownloadFileEntry, file: IpfsStorageModels.IpfsFileEntry): void => {
  StoreManager.store.dispatch(IpfsStorageActions.downloadListEntrySetDownloaded(entry.id, file));
};

export const createUploadFileEntry = async (path: string, uid: string = ''): Promise<IpfsStorageModels.UploadsFileEntry> => {
  const fileStats = await getIpfsFileEntry(path);
  return IpfsStorageUtils.createUploadsFileEntry(fileStats, uid);
};

export const uploadFileWithSendStatus = async (options: UploadFileOptions): Promise<models.UploadFileControls> => {
  // Creating file entry for adding file to client loader panel
  const fileEntry = await createUploadFileEntry(options.path, options.uid);
  StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntryAdd(fileEntry));

  const uploadingFile = await IpfsStorage.uploadFileWithAbort(options.path, (progress) => {
    // Update file progress for dapp and client
    StoreManager.store.dispatch(actions.uploadFileProgress(fileEntry.id, progress));
    StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntryUpdateProgress(fileEntry.id, progress));
  });

  // Add active upload to global upload list;
  ActiveLoads.addActiveUpload({
    dappName: options.dappName,
    uid: options.uid,
    abort: uploadingFile.abort,
  });

  uploadingFile.file.then((ipfsFile) => {
    // If file has been uploaded replace entry to uploaded list and remove it from global upload list in ActiveLoads.activeUploads
    StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntrySetUploaded(fileEntry.id, ipfsFile.hash));
    ActiveLoads.removeActiveUploadByUid(options.uid);
  });

  return uploadingFile;
};

export const downloadFile = async (options: DownloadFileOptions): Promise<models.DownloadFileControls> => {
  const targetDirectory = await FileManager.selectDirectory();
  if (!targetDirectory) {
    throw new Error('Directory has not been selected');
  }
  // Creating file entry for adding file to client loader panel
  const downloadFileEntry = await beforeDownloadFileHookClient(options.hash, options.uid);

  const download = await IpfsStorage.downloadFileWithAbort(options.hash, targetDirectory);

  // If dapp closed after start downloading and before ipfs initialize we need to abort process
  if (options.dappName && !DappComponent.getDappByName(options.dappName)) {
    download.abort();
  } else {
    // If dapp does not close add active download to global download list ActiveLoads.activeDownloads
    ActiveLoads.addActiveDownload({
      dappName: options.dappName,
      uid: options.uid,
      hash: options.hash,
      abort: download.abort,
    });
  }

  download.file.then((file) => {
    // If file has been loaded replace download to downloaded list
    // in client loader panel and remove from global download list ActiveLoads.activeDownloads
    afterDownloadFileHookClient(downloadFileEntry, file);
    ActiveLoads.removeActiveDownloadByUid(options.uid);
  });

  return download;
};

interface UploadFileOptions {
  path: string;
  uid?: string;
  dappName?: string;
}

interface DownloadFileOptions {
  hash: string;
  uid?: string;
  dappName?: string;
}

interface ActiveLoad {
  dappName?: string;
  abort: () => void;
  uid: string;
}

interface ActiveDownload {
  dappName?: string;
  abort: () => void;
  hash: string;
  uid: string;
}

export class ActiveLoads {
  static activeUploads: ActiveLoad[] = [];
  static activeDownloads: ActiveLoad[] = [];

  static addActiveUpload(load: ActiveLoad) {
    ActiveLoads.activeUploads.push(load);
  }

  static removeActiveUploadByUid(uid: string) {
    ActiveLoads.activeUploads = ActiveLoads.activeUploads.filter((item) => {
      const condition = item.uid === uid;

      if (condition) {
        try {
          item.abort();
        } catch (err) {
          console.log(err);
        }
      }

      return !condition;
    });
  }

  static removeActiveUploadsByDappName(dappName: string) {
    ActiveLoads.activeUploads = ActiveLoads.activeUploads.filter((item) => {
      const condition = item.dappName === dappName;

      if (condition) {
        try {
          item.abort();
        } catch (err) {
          console.log(err);
        }
      }

      return !condition;
    });
  }

  static addActiveDownload(load: ActiveDownload) {
    ActiveLoads.activeDownloads.push(load);
  }

  static removeActiveDownloadByUid(uid: string) {
    ActiveLoads.activeDownloads = ActiveLoads.activeDownloads.filter((item) => {
      const condition = item.uid === uid;

      if (condition) {
        try {
          item.abort();
        } catch (err) {
          console.log(err);
        }
      }

      return !condition;
    });
  }

  static removeActiveDownloadsByDappName(dappName: string) {
    ActiveLoads.activeDownloads = ActiveLoads.activeDownloads.filter((item) => {
      const condition = item.dappName === dappName;

      if (condition) {
        try {
          item.abort();
        } catch (err) {
          console.log(err);
        }
      }

      return !condition;
    });
  }
}
