import { models as FileManagerModels } from '../FileManager';

export interface IpfsFileEntry {
  id: FileManagerModels.FileId;
  hash: string;
}

export type IpfsFileEntryList = IpfsFileEntry[];
