import { action } from 'typesafe-actions';
import * as constants from '../constants';


export const loggerWriteSuccess = (message: string, targetUUID? :string) => action(constants.LOGGER_WRITE_SUCCESS, message, { targetUUID });
export const loggerWriteFailure = (error: string, targetUUID? :string) => action(constants.LOGGER_WRITE_FAILURE, error, { targetUUID });
export const writeMessage = (message: string) =>  action(constants.LOGGER_WRITE, message);
