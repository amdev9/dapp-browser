export interface IpfsFileEntry {
  path: string;
  size: number;
  name: string;
}

export interface UploadsFileEntry {
  id: string;
  file: IpfsFileEntry;
  progress: number;
  success?: any;
  error?: any;
}

export interface UploadedFileEntry {
  id: string;
  file: IpfsFileEntry;
  hash: string;
}

export type IpfsStorageState = {
  uploads: UploadsFileEntry[];
  uploaded: UploadedFileEntry[];
};
