import { action } from 'typesafe-actions';
import {
    TOGGLE_KEYCHAIN_PANEL,
    KEYCHAIN_CREATE,
    KEYCHAIN_REMOVE_KEY,
    KEYCHAIN_LIST,
    KEYCHAIN_LIST_SUCCESS,
    KEYCHAIN_SIGN,
    KEYCHAIN_SELECT_KEY,
} from '../constants';

export const toggle = () => action(TOGGLE_KEYCHAIN_PANEL);

export const createKey = (key: string) => action(KEYCHAIN_CREATE, { key });

export const removeKey = (name: string) => action(KEYCHAIN_REMOVE_KEY, { name });

export const signKey = (key: string) => action(KEYCHAIN_SIGN, { key });

export const selectKey = (key: string) => action(KEYCHAIN_SELECT_KEY, { key });

export const list = () => action(KEYCHAIN_LIST);

export const listSuccess = (items: string[]) => action(KEYCHAIN_LIST_SUCCESS, items);
