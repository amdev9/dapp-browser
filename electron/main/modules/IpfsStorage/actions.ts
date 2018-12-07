import { action } from 'typesafe-actions';
import * as constants from './constants';
import { models as FileManagerModels } from '../FileManager';

export interface IpfsFileEntry {
  id: FileManagerModels.FileId;
  hash: string;
}

export type IpfsFileEntryList = IpfsFileEntry[];

export const uploadIpfsFile = (entry: string) => action(constants.IPFS_STORAGE_UPLOAD_FILE, { entry });

export const uploadIpfsFileSuccess = (ipfsEntry: IpfsFileEntry, targetUUID? :string) =>
  action(constants.IPFS_STORAGE_UPLOAD_FILE_SUCCESS, { ipfsEntry }, { targetUUID });

export const uploadIpfsFileFailure = (error: string, targetUUID? :string) =>
  action(constants.IPFS_STORAGE_UPLOAD_FILE_FAILURE, error, { targetUUID });

export const downloadIpfsFile = (hash: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE, { hash });

export const downloadIpfsFileSuccess = (file: IpfsFileEntry, targetUUID: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS, { file }, { targetUUID });

export const downloadIpfsFileFailure = (error: string, targetUUID: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE_FAILURE, error, { targetUUID });
