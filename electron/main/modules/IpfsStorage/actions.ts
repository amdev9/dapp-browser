import { action } from 'typesafe-actions';
import * as constants from './constants';
import * as models from './models';

export const uploadIpfsFile = (entry: string) => action(constants.IPFS_STORAGE_UPLOAD_FILE, { entry });

export const uploadIpfsFileSuccess = (ipfsEntry: models.IpfsFileEntry, uid: string, targetUUID? :string) =>
  action(constants.IPFS_STORAGE_UPLOAD_FILE_SUCCESS, { ipfsEntry }, { uid, targetUUID });

export const uploadIpfsFileFailure = (error: string, uid: string, targetUUID? :string) =>
  action(constants.IPFS_STORAGE_UPLOAD_FILE_FAILURE, error, { uid, targetUUID });

export const downloadIpfsFile = (hash: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE, { hash });

export const downloadIpfsFileSuccess = (file: models.IpfsFileEntry, uid: string, targetUUID: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS, { file }, { uid, targetUUID });

export const downloadIpfsFileFailure = (error: string, uid: string, targetUUID: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE_FAILURE, error, { uid, targetUUID });
