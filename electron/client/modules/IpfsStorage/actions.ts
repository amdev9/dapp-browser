import { action } from 'typesafe-actions';

import * as constants from './constants';
import * as models from './models';

export const ipfsStorageUploadFile = (path: string, sendProgress: boolean = false, uid?: string) =>
  action(constants.CLIENT_IPFS_STORAGE_UPLOAD_FILE, { path, sendProgress }, { uid });

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

export const uploadsListEntryAdd = (entry: models.UploadsFileEntry) =>
  action(constants.CLIENT_UPLOADS_LIST_ENTRY_ADD, { entry });

export const uploadsListEntryUpdateProgress = (entryId: string, progress: number) =>
  action(constants.CLIENT_UPLOADS_LIST_ENTRY_UPDATE_PROGRESS, { entryId, progress });

export const uploadsListEntrySetError = (entryId: string, error: any) =>
  action(constants.CLIENT_UPLOADS_LIST_ENTRY_SET_ERROR, { entryId, error });

export const uploadsListEntryDelete = (entryId: string) =>
  action(constants.CLIENT_UPLOADS_LIST_ENTRY_DELETE, { entryId });

export const uploadedListFileAdd = (file: models.UploadedFileEntry) =>
  action(constants.CLIENT_UPLOADED_LIST_FILE_ADD, { file });

export const uploadedListDeleteAll = () =>
  action(constants.CLIENT_UPLOADED_LIST_DELETE_ALL);

export const downloadListEntryAdd = (entry: models.DownloadFileEntry) =>
  action(constants.CLIENT_DOWNLOAD_LIST_ENTRY_ADD, { entry });

export const downloadListEntryDelete = (entryId: string) =>
  action(constants.CLIENT_DOWNLOAD_LIST_ENTRY_DELETE, { entryId });

export const downloadListEntrySetError = (entryId: string, error: any) =>
  action(constants.CLIENT_DOWNLOAD_LIST_ENTRY_SET_ERROR, { entryId, error });

export const downloadedListFileAdd = (entry: models.DownloadedFileEntry) =>
  action(constants.CLIENT_DOWNLOADED_LIST_ENTRY_ADD, { entry });

export const dappIpfsUploadFile = (path: string, sendProgress: boolean = false, uid?: string) =>
  action(constants.CLIENT_DAPP_IPFS_STORAGE_UPLOAD_FILE, { path, sendProgress }, { uid });

export const dappIpfsUploadFileSuccess = (hash: string, uid?: string) =>
  action(constants.CLIENT_DAPP_IPFS_STORAGE_UPLOAD_FILE_SUCCESS, { hash }, { uid });

export const dappIpfsUploadFileFailure = (error: any, uid?: string) =>
  action(constants.CLIENT_DAPP_IPFS_STORAGE_UPLOAD_FILE_FAILURE, { error }, { uid });

export const dappIpfsUploadFileStatus = (progress: number, uid: string) =>
  action(constants.CLIENT_DAPP_IPFS_STORAGE_UPLOAD_FILE_STATUS, { progress }, { uid });
