import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const toggle = () => action(constants.TOGGLE_KEYCHAIN_PANEL);

export const createKey = (key: string) => action(constants.KEYCHAIN_CREATE, { key });

export const removeKey = (name: string) => action(constants.KEYCHAIN_REMOVE_KEY, { name });

export const signKey = (key: string) => action(constants.KEYCHAIN_SIGN, { key });

export const unlockKey = () => action(constants.KEYCHAIN_UNLOCK);

export const selectKey = (key: string) => action(constants.KEYCHAIN_SELECT_KEY, { key });

export const list = () => action(constants.KEYCHAIN_LIST);

export const lock = () => action(constants.KEYCHAIN_LOCK);

export const listSuccess = (items: string[]) => action(constants.KEYCHAIN_LIST_SUCCESS, items);

export const lockSuccess = () => action(constants.KEYCHAIN_LOCK_SUCCESS);

export const unlockSuccess = () => action(constants.KEYCHAIN_UNLOCK_SUCCESS);
