import { ActionType } from 'typesafe-actions';
import { KeychainPanel } from './state';
import * as keychainActions from '../actions/keychain';
import * as constants from '../constants';

export type KeychainPanelAction = ActionType<typeof keychainActions>;

export default function keychain(state: KeychainPanel = null, action: KeychainPanelAction) {
  switch (action.type) {
    case constants.KEYCHAIN_CREATE_KEY:
      if (!state.items.includes(action.payload.name)) {
        return { ...state, items: [...state.items, action.payload.name] };
      } else {
        return state;
      }

    case constants.KEYCHAIN_REMOVE_KEY:
      return {...state, items: state.items.filter(item => item !== action.payload.name)};

    default:
      return state;
  }
}
