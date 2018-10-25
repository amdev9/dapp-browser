import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const downloadDappSuccess = (targetUUID: string) =>
  action(constants.MARKET_DOWNLOAD_DAPP_SUCCESS, null, { targetUUID });

export const downloadDappFailure = (error: string, targetUUID: string) =>
  action(constants.MARKET_DOWNLOAD_DAPP_FAILURE, error, { targetUUID });
