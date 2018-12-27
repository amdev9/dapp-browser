import { action } from 'typesafe-actions';

import * as constants from './constants';

export const ipfsStorageUploadFile = (path: string, progress: boolean) =>
  action(constants.CLIENT_IPFS_STORAGE_UPLOAD_FILE, { path, progress });

export const ipfsStorageUploadFileSuccess = (hash: string, uid: string) =>
  action(constants.CLIENT_IPFS_STORAGE_UPLOAD_FILE_SUCCESS, { hash }, { uid });

export const ipfsStorageUploadFileFailure = (error: string, uid: string) =>
  action(constants.CLIENT_IPFS_STORAGE_UPLOAD_FILE_FAILURE, { error }, { uid });

export const ipfsStorageUploadFileStatus = (progress: number, uid: string) =>
  action(constants.CLIENT_IPFS_STORAGE_UPLOAD_FILE_STATUS, { progress }, { uid });

export const ipfsStorageDownloadFile = (hash: string) =>
  action(constants.CLIENT_IPFS_STORAGE_DOWNLOAD_FILE, { hash });

export const ipfsStorageDownloadFileSuccess = (hash: string, uid: string) =>
  action(constants.CLIENT_IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS, { hash }, { uid });

export const ipfsStorageDownloadFileFailure = (error: string, uid: string) =>
  action(constants.CLIENT_IPFS_STORAGE_DOWNLOAD_FILE_FAILURE, { error }, { uid });

export const ipfsStorageDownloadFileStatus = (progress: string, uid: string) =>
  action(constants.CLIENT_IPFS_STORAGE_DOWNLOAD_FILE_STATUS, { progress }, { uid });

