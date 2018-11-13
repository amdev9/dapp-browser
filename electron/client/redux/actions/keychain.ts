import { action } from 'typesafe-actions';
import { TOGGLE_KEYCHAIN_PANEL } from '../constants';

export const toggle = (openStatus: boolean) => action(TOGGLE_KEYCHAIN_PANEL, { isOpen: openStatus });
