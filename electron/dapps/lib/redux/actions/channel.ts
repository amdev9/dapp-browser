import * as constants from '../constants'

export function openChannelIntent() {
  return {
    type: constants.INTENT_OPEN_CHANNELS
  };
}

export const openFileManagerDialog = () => ({
  type: constants.FILE_MANAGER_OPEN_DIALOG
})

export const uploadFilesIpfsStorage = (entryList: Array<string>) => ({
  type: constants.IPFS_STORAGE_UPLOAD_FILES,
  payload: entryList,
})

export const showFileEntries = () => ({
  type: constants.SHOW_FILE_ENTRIES
})
