import { Action } from 'redux';
import { ToggleStatus } from './state';
import * as constants from '../constants';

interface IsOpenAction extends Action {
  payload: {
    isOpen: boolean;
  };
}

const actionToFieldName: { [index:string] : string } = {
  [constants.TOGGLE_SEARCH_PANEL]: 'search',
  [constants.TOGGLE_LOADER_PANEL]: 'loader',
  [constants.TOGGLE_NOTIFICATION_PANEL]: 'notification',
  [constants.TOGGLE_STATUS_BAR_PANEL]: 'statusBar',
  [constants.TOGGLE_PEERS_BAR_PANEL]: 'statusBarPeers',
  [constants.TOGGLE_KEYCHAIN_PANEL]: 'keychain',
};

export default function isOpen(state: ToggleStatus = null, action: IsOpenAction) {
  if (Object.keys(actionToFieldName).includes(action.type)) {
    const fieldName = actionToFieldName[action.type];
    return { ...state, [fieldName]: !state[fieldName] };
  } else {
    return state;
  }
}
