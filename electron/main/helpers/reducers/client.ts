import {
  SWITCH_DAPP,
  TOGGLE_HOME,
  TOGGLE_NOTIFICATION_PANEL,
  TOGGLE_LOADER_PANEL,
  TOGGLE_STATUS_BAR_PANEL,
  TOGGLE_PEERS_BAR_PANEL,
  TOGGLE_SETTINGS_PANEL,
  TOGGLE_SEARCH_PANEL,
  TOGGLE_APP_HOME,
  APPS_FEED_RESIZE,
  REMOVE_TRAY_ITEM
} from '../constants';
import { TrayAction } from '../actions/client';
import { Client } from './state';

const initialState: Client = {
  activeDapp: {
    appName: null
  },
  isHome: true,
  notification: {isOpen: false},
  loader: {isOpen: false},
  statusBar: {isOpen: false, isPeersOpen: false},
  search: { isOpen: false },
  window: {width: 0, height: 0}
};

export function client(state: Client = initialState, action: TrayAction) {
  switch (action.type) {
    case SWITCH_DAPP:

      const dappName = action.payload.targetDappName;
      return {
        ...state,
        activeDapp: { appName: dappName },
        isHome: false
      };

    case TOGGLE_HOME:
      const isHome = action.payload.isHome;
      return {
        ...state,
        isHome: isHome,
        activeDapp: {
          appName: null
        }
      };

    case TOGGLE_APP_HOME:
      return {
        ...state,
        isHome: false,
        activeDapp: {
          appName: action.payload.targetDappName
        }
      };

    case REMOVE_TRAY_ITEM:
      return {
        ...state,
        isHome: true,
        activeDapp: {
          appName: null
        }
      };  

    case TOGGLE_NOTIFICATION_PANEL:
      return {
        ...state,
        notification: {
          isOpen: !state.notification.isOpen
        }
      };

    case TOGGLE_LOADER_PANEL:
      return {
        ...state,
        loader: {
          isOpen: !state.loader.isOpen
        }
      };

    case TOGGLE_STATUS_BAR_PANEL:
      return {
        ...state,
        statusBar: {
          ...state.statusBar,
          isOpen: !state.statusBar.isOpen
        }
      };

    case TOGGLE_PEERS_BAR_PANEL:
      return {
        ...state,
        statusBar: {
          ...state.statusBar,
          isPeersOpen: !state.statusBar.isPeersOpen
        }
      };

    case TOGGLE_SEARCH_PANEL:
      return {
        ...state,
        search: {
          isOpen: !state.search.isOpen
        }
      };

    case APPS_FEED_RESIZE:
      return { ...state, window: action.payload };

    default:
      return state;
  }
}
