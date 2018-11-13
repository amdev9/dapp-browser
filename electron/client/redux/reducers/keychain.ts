import { ActionType } from 'typesafe-actions';
import { KeychainPanel } from './state';
import * as keychainActions from '../actions/keychain';

export type KeychainPanelAction = ActionType<typeof keychainActions>;

export default function keychain(state: KeychainPanel = null, action: KeychainPanelAction) {
  switch (action.type) {

    default:
      return state;
  }
}
