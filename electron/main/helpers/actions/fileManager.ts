import * as constants from '../constants'
import { EntryIdsList } from '../../systemComponents/src'

export const openDialogSuccess = (entryList: EntryIdsList, targetUUID? :string) => ({
  type: constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS,
  payload: entryList,
  meta: { targetUUID }
})

export const openDialogFailure = (error: string, targetUUID? :string) => ({
  type: constants.FILE_MANAGER_OPEN_DIALOG_FAILURE,
  payload: error,
  meta: { targetUUID }
})

export const openDialog = () => ({
  type: constants.FILE_MANAGER_OPEN_DIALOG
})


