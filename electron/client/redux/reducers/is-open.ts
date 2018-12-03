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
  [constants.TOGGLE_STATUS_BAR_PANEL]: 'statusBar',
  [constants.TOGGLE_PEERS_BAR_PANEL]: 'statusBarPeers',
};

export default function isOpen(state: ToggleStatus = null, action: IsOpenAction) {
  if (Object.keys(actionToFieldName).includes(action.type)) {
    const fieldName = actionToFieldName[action.type];
    return { ...state, [fieldName]: !state[fieldName] };
  } else {
    switch (action.type) {
      case constants.TOGGLE_LOADER_PANEL:
        return {...state, loader: !state.loader, notification: false, keychain: false};
      case constants.TOGGLE_NOTIFICATION_PANEL:
        return {...state, loader: false, notification: !state.notification, keychain: false};
      case constants.TOGGLE_KEYCHAIN_PANEL:
        return {...state, loader: false, notification: false, keychain: !state.keychain};
      case constants.TOGGLE_SETTINGS_PANEL:
        return {...state, settings: true};
      case constants.CLIENT_TOGGLE_HOME:
        return {...state, settings: false};
      case constants.CLIENT_SWITCH_DAPP:
        return {...state, settings: false};
      default:
        return state;
    }
  }
}
