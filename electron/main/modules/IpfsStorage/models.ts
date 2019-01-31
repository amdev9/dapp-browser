export interface IpfsFileEntry {
  id: string;
  hash: string;
  fileName: string;
}

export type IpfsFileEntryList = IpfsFileEntry[];

export interface IpfsFileObject {
  hash: string;
  path: string;
  size: number;
}

export interface UploadFileControls {
  abort: () => void;
  file: Promise<IpfsFileObject>;
}

export interface DownloadFileObject {
  path: string;
  size: number;
  name: string;
}

export interface DownloadFileControls {
  abort: () => void;
  file: Promise<DownloadFileObject>;
}
