import { ActionType } from 'typesafe-actions';
import * as constants from '../constants';
import * as clientActions from '../actions/client';
import { Client } from './state';
import { togglePermissions } from './common';

export type ClientAction = ActionType<typeof clientActions>;

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
          loader: false,
          notification: !state.isOpen.notification,
          keychain: false,
        },
      };

    case constants.TOGGLE_LOADER_PANEL:
      return {
        ...state,
        isOpen: {
          ...state.isOpen,
          loader: !state.isOpen.loader,
          notification: false,
          keychain: false,
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
          loader: false,
          notification: false,
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
          search: !state.isOpen.search,
        },
      };

    case constants.TOGGLE_PERMISSION: {
      if (!state.permissions || !state.permissions.permissions) {
        return { ...state };
      }
      const statePermissions = state.permissions.permissions;
      const permissions = togglePermissions(action, statePermissions);
      return { ...state, permissions: { ...state.permissions, permissions } };
    }

    case constants.KEYCHAIN_LIST_SUCCESS:
      return { ...state, keychain: { items: action.payload } };

    case constants.KEYCHAIN_SELECT_KEY:
      return { ...state, keychain: { ...state.keychain, selectedKey: action.payload.key } };

    case constants.KEYCHAIN_REMOVE_KEY:
      return { ...state, keychain: { items: state.keychain.items.filter(item => item !== action.payload.name) } };

    default:
      return state;
  }
}
