import { action } from 'typesafe-actions'
import * as constants from '../constants'

export const openChannelIntent = () => ({
  type: constants.INTENT_OPEN_CHANNELS
})

export const openFileManagerDialog = () => ({
  type: constants.FILE_MANAGER_OPEN_DIALOG
})

export const uploadIpfsFile = (entry: string) => ({
  type: constants.IPFS_STORAGE_UPLOAD_FILE,
  payload: { entry },
})

export const showFileEntries = () => ({
  type: constants.SHOW_FILE_ENTRIES
})

export const networkGetBlock = () => ({
  type: constants.NETWORK_GET_BLOCK
})

export const showBlock = () => ({
  type: constants.SHOW_BLOCK
})

export const downloadIpfsFile = (hash: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE, { hash })
