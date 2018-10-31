import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const saveSuccess = (entry: {key: string, value: string}, targetUUID?: string) =>
  action(constants.STORAGE_SAVE_SUCCESS, entry, { targetUUID });

export const saveFailure = (error: string, targetUUID: string) =>
  action(constants.STORAGE_SAVE_FAILURE, error, { targetUUID });
