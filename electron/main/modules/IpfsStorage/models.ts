import { models as FileManagerModels } from '../FileManager';

export interface IpfsFileEntry {
  id: FileManagerModels.FileId;
  hash: string;
  fileName: string;
}

export type IpfsFileEntryList = IpfsFileEntry[];
