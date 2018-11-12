import { Action } from 'redux';
import { ToggleStatus } from './state';
import {
    TOGGLE_SEARCH_PANEL,
    TOGGLE_LOADER_PANEL,
    TOGGLE_NOTIFICATION_PANEL,
    TOGGLE_STATUS_BAR_PANEL,
    TOGGLE_PEERS_BAR_PANEL,
} from '../constants';

interface IsOpenAction extends Action {
    payload: {
      isOpen: boolean;
    };
  }

export default function isOpen(state: ToggleStatus = null, action: IsOpenAction) {
  switch (action.type) {
    case TOGGLE_SEARCH_PANEL:
      if (action.payload && action.payload.hasOwnProperty('isOpen')) {
        return { ...state, search: action.payload.isOpen };
      } else {
        return { ...state, search: !state.search };
      }

    case TOGGLE_LOADER_PANEL:
      if (action.payload && action.payload.hasOwnProperty('isOpen')) {
        return { ...state, loader: action.payload.isOpen };
      } else {
        return { ...state, loader: !state.loader };
      }

    case TOGGLE_NOTIFICATION_PANEL:
      if (action.payload && action.payload.hasOwnProperty('isOpen')) {
        return { ...state, notification: action.payload.isOpen };
      } else {
        return { ...state, notification: !state.notification };
      }

    case TOGGLE_STATUS_BAR_PANEL:
      return { ...state, statusBar: !state.statusBar };

    case TOGGLE_PEERS_BAR_PANEL:
      return { ...state, statusBarPeers: !state.statusBarPeers };

    default:
      return state;
  }
}
