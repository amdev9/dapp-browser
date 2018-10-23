import { action } from 'typesafe-actions';
import * as constants from '../constants';
import { FileEntry } from '../FileManager';

export const openDialogSuccess = (entry: FileEntry, targetUUID? :string) =>
  action(constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS, { entry }, { targetUUID });

export const openDialogFailure = (error: string, targetUUID? :string) =>
  action(constants.FILE_MANAGER_OPEN_DIALOG_FAILURE, error, { targetUUID });

export const openDialog = () =>
  action(constants.FILE_MANAGER_OPEN_DIALOG);
