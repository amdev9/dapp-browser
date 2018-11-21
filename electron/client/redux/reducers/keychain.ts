import { ActionType } from 'typesafe-actions';
import { KeychainPanel } from './state';
import * as keychainActions from '../actions/keychain';
import * as constants from '../constants';

export type KeychainPanelAction = ActionType<typeof keychainActions>;

export default function keychain(state: KeychainPanel = null, action: KeychainPanelAction) {
  switch (action.type) {

    case constants.KEYCHAIN_SELECT_KEY:
      return { ...state, selectedKey: action.payload.key };

    case constants.KEYCHAIN_REMOVE_KEY:
      return {...state, items: state.items.filter(item => item !== action.payload.name)};

    case constants.KEYCHAIN_LIST_SUCCESS:
      return {...state, items: action.payload};

    default:
      return state;
  }
}
