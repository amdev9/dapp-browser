import { action } from 'typesafe-actions';
import * as constants from '../constants';
import { FileId } from '../systemComponents/FileManager';

export interface IpfsFileEntry {
  id: FileId;
  hash: string;
}

export type IpfsFileEntryList = IpfsFileEntry[];

export const uploadIpfsFileSuccess = (ipfsEntry: IpfsFileEntry, targetUUID? :string) =>
  action(constants.IPFS_STORAGE_UPLOAD_FILE_SUCCESS, { ipfsEntry }, { targetUUID });

export const uploadIpfsFileFailure = (error: string, targetUUID? :string) =>
  action(constants.IPFS_STORAGE_UPLOAD_FILE_FAILURE, error, { targetUUID });

export const openDialog = () =>
  action(constants.FILE_MANAGER_OPEN_DIALOG);

export const downloadIpfsFileSuccess = (file: IpfsFileEntry, targetUUID: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS, { file }, { targetUUID });

export const downloadIpfsFileFailure = (error: string, targetUUID: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE_FAILURE, error, { targetUUID });
