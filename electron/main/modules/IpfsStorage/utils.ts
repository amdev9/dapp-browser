import * as pathModule from 'path';
import { promises as fs } from 'fs';

import * as IpfsStorageUtils from 'ClientApp/modules/IpfsStorage/utils';
import * as IpfsStorageActions from 'ClientApp/modules/IpfsStorage/actions';
import * as IpfsStorageModels from 'ClientApp/modules/IpfsStorage/models';

import StoreManager from '../../helpers/systemComponents/StoreManager';
import IpfsStorage, { IpfsFileObject } from './component';

export const getIpfsFileEntry = async (path: string): Promise<IpfsStorageModels.IpfsFileEntry> => {
  const name = pathModule.basename(path);
  const stats = await fs.lstat(path);

  return {
    path,
    name,
    size: stats.size,
  };
};

export const beforeUploadFileHookClient = async (path: string, uid: string = ''): Promise<IpfsStorageModels.UploadsFileEntry> => {
  const fileStats = await getIpfsFileEntry(path);
  const fileEntry = IpfsStorageUtils.createUploadsFileEntry(fileStats, uid);

  StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntryAdd(fileEntry));

  return fileEntry;
};

// export const afterUploadFileHookClient = (entry: IpfsStorageModels.UploadsFileEntry, hash: string): void => {
//   StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntryDelete(entry.id));
//   const uploadedEntry = IpfsStorageUtils.createUploadedFileEntry(entry, hash);
//   StoreManager.store.dispatch(IpfsStorageActions.uploadedListFileAdd(uploadedEntry));
// };

export const progressUploadHookClient = (entryId: string, progress: number) => {
  StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntryUpdateProgress(entryId, progress));
};

export const beforeDownloadFileHookClient = async (hash: string, uid: string = ''): Promise<IpfsStorageModels.DownloadFileEntry> => {
  const fileEntry = IpfsStorageUtils.createDownloadFileEntry(hash, uid);

  StoreManager.store.dispatch(IpfsStorageActions.downloadListEntryAdd(fileEntry));

  return fileEntry;
};

export const afterDownloadFileHookClient = async (entry: IpfsStorageModels.DownloadFileEntry, file: IpfsStorageModels.IpfsFileEntry): Promise<void> => {
  StoreManager.store.dispatch(IpfsStorageActions.downloadListEntrySetDownloaded(entry.id, file));
};

export const uploadFileWithSendStatus = async (path: string, uid: string = ''): Promise<IpfsFileObject | null> => {
  const fileEntry = await beforeUploadFileHookClient(path, uid);

  const ipfsObject = await IpfsStorage.uploadFile(path, (progress) => {
    progressUploadHookClient(fileEntry.id, progress);
  });

  StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntrySetUploaded(fileEntry.id, ipfsObject.hash));

  return ipfsObject;
};
