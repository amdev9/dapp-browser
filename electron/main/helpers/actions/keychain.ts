import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const createSuccess = (result: boolean, targetUUID?: string) =>
  action(constants.KEYCHAIN_CREATE_SUCCESS, result, { targetUUID });

export const createFailure = (error: string, targetUUID?: string) =>
  action(constants.KEYCHAIN_CREATE_FAILURE, error, { targetUUID });

export const create = (key: string, cipher: string, curve: string) =>
  action(constants.KEYCHAIN_CREATE, { key, cipher, curve });

export const listSuccess = (result: string[], targetUUID?: string) =>
  action(constants.KEYCHAIN_LIST_SUCCESS, result, { targetUUID });

export const listFailure = (error: string, targetUUID?: string) =>
  action(constants.KEYCHAIN_LIST_FAILURE, error, { targetUUID });

export const list = () =>
  action(constants.KEYCHAIN_LIST);

export const lockSuccess = (result: boolean, targetUUID: string) =>
  action(constants.KEYCHAIN_LOCK_SUCCESS, result, { targetUUID });

export const lockFailure = (error: string, targetUUID: string) =>
  action(constants.KEYCHAIN_LOCK_FAILURE, error, { targetUUID });

export const signSuccess = (result: string, uid: string, targetUUID: string) =>
  action(constants.KEYCHAIN_SIGN_SUCCESS, result, { uid, targetUUID });

export const signFailure = (error: string, uid: string, targetUUID: string) =>
  action(constants.KEYCHAIN_SIGN_FAILURE, error, { uid, targetUUID });

export const sign = (key: string, chainId: string, transaction: string) =>
  action(constants.KEYCHAIN_CREATE);
