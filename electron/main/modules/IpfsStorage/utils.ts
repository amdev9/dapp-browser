import * as pathModule from 'path';
import { promises as fs } from 'fs';

import * as IpfsStorageUtils from 'ClientApp/modules/IpfsStorage/utils';
import * as IpfsStorageActions from 'ClientApp/modules/IpfsStorage/actions';
import * as IpfsStorageModels from 'ClientApp/modules/IpfsStorage/models';

import StoreManager from '../../helpers/systemComponents/StoreManager';
import IpfsStorage, { IpfsFileObject } from './component';
import * as actions from './actions';

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

export const afterDownloadFileHookClient = async (entry: IpfsStorageModels.DownloadFileEntry, file: IpfsStorageModels.IpfsFileEntry): Promise<void> => {
  StoreManager.store.dispatch(IpfsStorageActions.downloadListEntrySetDownloaded(entry.id, file));
};

export const createUploadFileEntry = async (path: string, uid: string = ''): Promise<IpfsStorageModels.UploadsFileEntry> => {
  const fileStats = await getIpfsFileEntry(path);
  return IpfsStorageUtils.createUploadsFileEntry(fileStats, uid);
};

export const uploadFileWithSendStatus = async (path: string, uid: string = ''): Promise<IpfsFileObject | null> => {
  const fileEntry = await createUploadFileEntry(path, uid);

  StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntryAdd(fileEntry));

  const ipfsObject = await IpfsStorage.uploadFile(path, (progress) => {
    StoreManager.store.dispatch(actions.uploadFileProgress(fileEntry.id, progress));
    StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntryUpdateProgress(fileEntry.id, progress));
  });

  StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntrySetUploaded(fileEntry.id, ipfsObject.hash));

  return ipfsObject;
};
