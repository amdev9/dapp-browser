import { ActionType } from 'typesafe-actions';
import * as constants from '../constants';
import * as clientActions from '../actions/client';
import { Client } from './state';
import { togglePermissions } from './common';

export type ClientAction = ActionType<typeof clientActions>;

// const initialState: Client = {
//   activeDapp: {
//     appName: null,
//   },
//   isHome: true,
//   notification: { isOpen: false },
//   loader: { isOpen: false },
//   statusBar: { isOpen: false, isPeersOpen: false },
//   search: { isOpen: false },
//   window: { width: 0, height: 0 },
//   permissions: { permissions: {} },
// };

export function client(state: Client = null, action: any) { // @todo refactor add actions to client.ts, remove isOpen
  switch (action.type) {

    case constants.SWITCH_DAPP:
      const dappName = action.payload.targetDappName;
      return {
        ...state,
        activeDapp: { appName: dappName },
        isHome: false,
      };

    case constants.TOGGLE_HOME:
      const isHome = action.payload.isHome;
      return {
        ...state,
        isHome,
        activeDapp: {},
      };

    case constants.TOGGLE_APP_HOME:
      return {
        ...state,
        isHome: false,
        activeDapp: {
          appName: action.payload.targetDappName,
        },
      };

    case constants.TOGGLE_NOTIFICATION_PANEL:
      return {
        ...state,
        isOpen: {
          ...state.isOpen,
          notification: !state.isOpen.notification,
        },
      };

    case constants.TOGGLE_LOADER_PANEL:
      return {
        ...state,
        isOpen: {
          ...state.isOpen,
          loader: !state.isOpen.loader,
        },
      };

    case constants.TOGGLE_STATUS_BAR_PANEL:
      return {
        ...state,
        isOpen: {
          ...state.isOpen,
          statusBar: !state.isOpen.statusBar,
        },
      };

    case constants.TOGGLE_KEYCHAIN_PANEL:
      return {
        ...state,
        isOpen: {
          ...state.isOpen,
          keychain: !state.isOpen.keychain,
        },
      };

    case constants.TOGGLE_PEERS_BAR_PANEL:
      return {
        ...state,
        isOpen: {
          ...state.isOpen,
          statusBarPeers: !state.isOpen.statusBarPeers,
        },
      };

    case constants.TOGGLE_SEARCH_PANEL:
      return {
        ...state,
        isOpen: {
          ...state.isOpen,
          search: !state.isOpen.statusBarPeers,
        },
      };

    case constants.APPS_FEED_RESIZE:
      return { ...state, window: action.payload };

    case constants.TOGGLE_PERMISSION: {
      if (!state.permissions || !state.permissions.permissions) {
        return { ...state };
      }
      const statePermissions = state.permissions.permissions;
      const permissions = togglePermissions(action, statePermissions);
      return { ...state, permissions: { ...state.permissions, permissions } };
    }

    case constants.KEYCHAIN_CREATE_KEY:
      return { ...state, keychain: { items: [...state.keychain.items, action.payload.name] } };

    case constants.KEYCHAIN_REMOVE_KEY:
      return { ...state, keychain: { items: state.keychain.items.filter(item => item !== action.payload.name) } };

    default:
      return state;
  }
}
