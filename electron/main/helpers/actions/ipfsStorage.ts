import { action } from 'typesafe-actions';
import * as constants from '../constants';
import { FileEntryId } from '../FileManager';

export interface IpfsFileEntry {
  id: FileEntryId;
  hash: string;
}

export type IpfsFileEntryList = Array<IpfsFileEntry>

export const ipfsUploadFilesSuccess = (entryList: IpfsFileEntryList, targetUUID? :string) =>
  action(constants.IPFS_STORAGE_UPLOAD_FILES_SUCCESS, entryList, targetUUID);

export const ipfsUploadFilesFailure = (error: string, targetUUID? :string) =>
  action(constants.IPFS_STORAGE_UPLOAD_FILES_FAILURE, error, targetUUID);

export const openDialog = () =>
  action(constants.FILE_MANAGER_OPEN_DIALOG);


