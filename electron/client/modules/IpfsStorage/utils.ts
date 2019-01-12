import * as uuid from 'uuid/v4';

import * as models from './models';

export const createUploadsFileEntry = (entry: models.IpfsFileEntry): models.UploadsFileEntry => {
  return {
    id: uuid(),
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

export const createDownloadFileEntry = (hash: string): models.DownloadFileEntry => {
  return {
    hash,
    id: uuid(),
  };
};

export const createDownloadedFileEntry = (entry: models.DownloadFileEntry, file: models.IpfsFileEntry): models.DownloadedFileEntry => {
  return {
    file,
    hash: entry.hash,
    id: entry.id,
  };
};
