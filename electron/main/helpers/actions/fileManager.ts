import { action } from 'typesafe-actions';
import * as constants from '../constants';
import { EntryIdsList } from '../FileManager';


export const openDialogSuccess = (entryList: EntryIdsList, targetUUID? :string) => 
  action(constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS, entryList, targetUUID); 

export const openDialogFailure = (error: string, targetUUID? :string) => 
  action(constants.FILE_MANAGER_OPEN_DIALOG_FAILURE, error, targetUUID);

export const openDialog = () => 
  action(constants.FILE_MANAGER_OPEN_DIALOG);


