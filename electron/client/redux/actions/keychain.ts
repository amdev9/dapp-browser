import { action } from 'typesafe-actions';
import { TOGGLE_KEYCHAIN_PANEL, KEYCHAIN_CREATE_KEY, KEYCHAIN_REMOVE_KEY } from '../constants';

export const toggle = (openStatus: boolean) => action(TOGGLE_KEYCHAIN_PANEL, { isOpen: openStatus });

export const createKey = (name: string) => action(KEYCHAIN_CREATE_KEY, { name });

export const removeKey = (name: string) => action(KEYCHAIN_REMOVE_KEY, { name });
