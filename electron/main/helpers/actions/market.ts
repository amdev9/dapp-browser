import { action } from 'typesafe-actions';
import * as constants from '../constants';
import { AppItem } from '../systemComponents/AppsManager';

export const downloadDappSuccess = (parsedDapp: AppItem, targetUUID?: string) =>
  action(constants.MARKET_DOWNLOAD_DAPP_SUCCESS, { parsedDapp }, { targetUUID });

export const downloadDappFailure = (error: string, targetUUID: string) =>
  action(constants.MARKET_DOWNLOAD_DAPP_FAILURE, error, { targetUUID });
