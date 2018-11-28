import { ActionType } from 'typesafe-actions';
import { KeychainPanel } from './state';
import * as keychainActions from '../actions/keychain';
import * as constants from '../constants';

export type KeychainPanelAction = ActionType<typeof keychainActions>;

export default function keychain(state: KeychainPanel = null, action: KeychainPanelAction) {
  switch (action.type) {

    case constants.KEYCHAIN_SELECT_KEY:
      return { ...state, selectedKey: action.payload.key };

    case constants.KEYCHAIN_LOCK_SUCCESS:
      return {...state, successMessage: 'All keys have been locked'};

    case constants.KEYCHAIN_LIST_SUCCESS:
      return {...state, items: action.payload};

    default:
      return {...state, successMessage: null};
  }
}
