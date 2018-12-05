import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const buildTransactionSuccess = (result: string, uid: string, targetUUID: string) =>
  action(constants.ETHEREUM_BUILD_TRANSACTION_SUCCESS, result, { uid, targetUUID });

export const buildTransactionFailure = (errors: string, uid: string, targetUUID: string) =>
  action(constants.ETHEREUM_BUILD_TRANSACTION_FAILURE, errors, { uid, targetUUID });
