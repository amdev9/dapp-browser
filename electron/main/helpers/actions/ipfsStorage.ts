import { action } from 'typesafe-actions';
import * as constants from '../constants';
import {EntryIdsList, FileEntryId} from '../FileManager';

export interface IpfsFileEntry {
  id: FileEntryId;
  hash: string;
}

export type IpfsFileEntryList = Array<IpfsFileEntry>

export const ipfsUploadFilesSuccess = (ipfsEntry: IpfsFileEntry, targetUUID? :string) =>
  action(constants.IPFS_STORAGE_UPLOAD_FILE_SUCCESS, { ipfsEntry }, { targetUUID });

export const ipfsUploadFilesFailure = (error: string, targetUUID? :string) =>
  action(constants.IPFS_STORAGE_UPLOAD_FILE_FAILURE, error, { targetUUID });

export const openDialog = () =>
  action(constants.FILE_MANAGER_OPEN_DIALOG);

export const ipfsDownloadFileSuccess = (file: IpfsFileEntry, targetUUID: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS, { file }, { targetUUID})

export const ipfsDownloadFileFailure = (error: string, targetUUID: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE_FAILURE, error, { targetUUID})
