import { action } from 'typesafe-actions';
import * as constants from './constants';
import { FileEntry } from './models';

export const openDialogSuccess = (entry: FileEntry, uid: string, targetUUID? :string) =>
  action(constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS, { entry }, { uid, targetUUID });

export const openDialogFailure = (error: string, uid: string, targetUUID? :string) =>
  action(constants.FILE_MANAGER_OPEN_DIALOG_FAILURE, error, { uid, targetUUID });

export const openDialog = () =>
  action(constants.FILE_MANAGER_OPEN_DIALOG);
