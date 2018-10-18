import { ActionType } from 'typesafe-actions';
import * as constants from '../constants';
import * as clientActions from '../actions/client';
import { Client } from './state';

export type ClientAction = ActionType<typeof clientActions>;

const initialState: Client = {
  activeDapp: {
    appName: null
  },
  isHome: true,
  notification: {isOpen: false},
  loader: {isOpen: false},
  statusBar: {isOpen: false, isPeersOpen: false},
  search: { isOpen: false },
  window: {width: 0, height: 0},
  fileDialog: {isOpen: false}
};

export function client(state: Client = initialState, action: any) { //@todo refactor add actions to client.ts, remove isOpen
  switch (action.type) {
 
    case constants.SWITCH_DAPP:
      const dappName = action.payload.targetDappName;
      return {
        ...state,
        activeDapp: { appName: dappName },
        isHome: false
      };

    case constants.TOGGLE_HOME:
      const isHome = action.payload.isHome;
      return {
        ...state,
        isHome: isHome,
        activeDapp: {}
      };

    case constants.TOGGLE_APP_HOME:
      return {
        ...state,
        isHome: false,
        activeDapp: {
          appName: action.payload.targetDappName
        }
      };

    case constants.TOGGLE_NOTIFICATION_PANEL:
      return {
        ...state,
        notification: {
          isOpen: !state.notification.isOpen
        }
      };

    case constants.TOGGLE_LOADER_PANEL:
      return {
        ...state,
        loader: {
          isOpen: !state.loader.isOpen
        }
      };

    case constants.TOGGLE_STATUS_BAR_PANEL:
      return {
        ...state,
        statusBar: {
          ...state.statusBar,
          isOpen: !state.statusBar.isOpen
        }
      };

    case constants.TOGGLE_PEERS_BAR_PANEL:
      return {
        ...state,
        statusBar: {
          ...state.statusBar,
          isPeersOpen: !state.statusBar.isPeersOpen
        }
      };

    case constants.TOGGLE_SEARCH_PANEL:
      return {
        ...state,
        search: {
          isOpen: !state.search.isOpen
        }
      };

    case constants.APPS_FEED_RESIZE:
      return { ...state, window: action.payload };

    default:
      return state;
  }
}
