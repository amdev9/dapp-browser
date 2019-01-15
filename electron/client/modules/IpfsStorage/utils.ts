import * as uuid from 'uuid/v4';

import * as models from './models';

export const createUploadsFileEntry = (entry: models.IpfsFileEntry, uid: string = ''): models.UploadsFileEntry => {
  return {
    id: uid || uuid(),
    file: entry,
    progress: 0,
  };
};

export const createUploadedFileEntry = (entry: models.UploadsFileEntry, hash: string): models.UploadedFileEntry => {
  return {
    hash,
    id: entry.id,
    file: entry.file,
  };
};

export const createDownloadFileEntry = (hash: string, uid: string = ''): models.DownloadFileEntry => {
  return {
    hash,
    id: uid || uuid(),
  };
};

export const createDownloadedFileEntry = (entry: models.DownloadFileEntry, file: models.IpfsFileEntry): models.DownloadedFileEntry => {
  return {
    file,
    hash: entry.hash,
    id: entry.id,
  };
};
