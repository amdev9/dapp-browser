import { action } from 'typesafe-actions';
import * as constants from '../constants';
import { models as AppsManagerModels } from '../../modules/AppsManager';

export const downloadDappSuccess = (parsedDapp: AppsManagerModels.AppItem, targetUUID?: string) =>
  action(constants.MARKET_DOWNLOAD_DAPP_SUCCESS, { parsedDapp }, { targetUUID });

export const downloadDappFailure = (error: string, targetUUID: string) =>
  action(constants.MARKET_DOWNLOAD_DAPP_FAILURE, error, { targetUUID });
