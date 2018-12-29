import * as pathModule from 'path';
import { promises as fs } from 'fs';

import * as IpfsStorageUtils from 'ClientApp/modules/IpfsStorage/utils';
import * as IpfsStorageActions from 'ClientApp/modules/IpfsStorage/actions';
import * as IpfsStorageModels from 'ClientApp/modules/IpfsStorage/models';

import StoreManager from '../../helpers/systemComponents/StoreManager';

export const beforeUploadFileHookClient = async (path: string): Promise<IpfsStorageModels.UploadsFileEntry> => {
  const name = pathModule.basename(path);
  const stats = await fs.lstat(path);

  const fileEntry = IpfsStorageUtils.createUploadsFileEntry({
    path,
    name,
    size: stats.size,
  });

  StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntryAdd(fileEntry));

  return fileEntry;
};

export const afterUploadFileHookClient = (entry: IpfsStorageModels.UploadsFileEntry, hash: string): void => {
  StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntryDelete(entry.id));
  const uploadedEntry = IpfsStorageUtils.createUploadedFileEntry(entry, hash);
  StoreManager.store.dispatch(IpfsStorageActions.uploadedListFileAdd(uploadedEntry));
};

export const progressUploadHookClient = (entryId: string, progress: number) => {
  StoreManager.store.dispatch(IpfsStorageActions.uploadsListEntryUpdateProgress(entryId, progress));
};
