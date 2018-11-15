import { Dispatch } from 'redux';
import { Action } from './configureStore';
import { RendererConf } from '../../createDappView';

import * as constants from '../constants';
import { IState, Permission } from '../reducers/state';

const dappActions: string[] = [
  constants.INTENT_OPEN_CHANNELS,
  constants.OPEN_CHANNEL,
  constants.OPEN_CHANNEL_SUCCESS,
  constants.BIND_OPEN_CHANNELS_DONE,
  constants.FILE_MANAGER_OPEN_DIALOG,
  constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS,
  constants.FILE_MANAGER_OPEN_DIALOG_FAILURE,
  constants.TOGGLE_APP_HOME_SUCCESS,
  constants.HTTP_PROTOCOL_OPEN_LINK,
  constants.DAPP_ACTION_OPEN_LINK,
  constants.DAPP_ACTION_OPEN_LINK_SUCCESS,

  constants.IPFS_STORAGE_UPLOAD_FILE,
  constants.IPFS_STORAGE_UPLOAD_FILE_SUCCESS,
  constants.IPFS_STORAGE_UPLOAD_FILE_FAILURE,
  constants.IPFS_STORAGE_DOWNLOAD_FILE,
  constants.IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS,
  constants.IPFS_STORAGE_DOWNLOAD_FILE_FAILURE,
  constants.IPFS_ROOM_SUBSCRIBE,
  constants.IPFS_ROOM_SUBSCRIBE_SUCCESS,
  constants.IPFS_ROOM_SUBSCRIBE_FAILURE,
  constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST,
  constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_SUCCESS,
  constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_FAILURE,
  constants.IPFS_ROOM_SEND_MESSAGE_TO_DAPP,
  constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER,
  constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_SUCCESS,
  constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_FAILURE,
  constants.IPFS_ROOM_PEER_JOINED,
  constants.IPFS_ROOM_PEER_LEFT,
  constants.IPFS_ROOM_LEAVE,
  constants.IPFS_ROOM_LEAVE_SUCCESS,
  constants.IPFS_ROOM_LEAVE_FAILURE,

  constants.SHOW_FILE_ENTRIES,
  constants.NETWORK_GET_BLOCK,
  constants.NETWORK_GET_WITNESS,
  constants.NETWORK_SUBSCRIBE,
  constants.NETWORK_UNSUBSCRIBE,
  constants.SHOW_BLOCK,
  constants.LOGGER_WRITE,
  constants.LOGGER_WRITE_SUCCESS,
  constants.LOGGER_WRITE_FAILURE,

  constants.KEYCHAIN_CREATE,
  constants.KEYCHAIN_CREATE_SUCCESS,
  constants.KEYCHAIN_CREATE_FAILURE,
  constants.KEYCHAIN_LIST,
  constants.KEYCHAIN_LIST_SUCCESS,
  constants.KEYCHAIN_LIST_FAILURE,
  constants.KEYCHAIN_SIGN,
  constants.KEYCHAIN_SIGN_SUCCESS,
  constants.KEYCHAIN_SIGN_FAILURE,
  constants.KEYCHAIN_SHOW_RESULT,

  constants.STORAGE_SAVE,
  constants.STORAGE_SAVE_SUCCESS,
  constants.STORAGE_SAVE_FAILURE,
  constants.STORAGE_REMOVE,
  constants.STORAGE_REMOVE_SUCCESS,
  constants.STORAGE_REMOVE_FAILURE,
  constants.STORAGE_FIND_ALL,
  constants.STORAGE_FIND_ALL_SUCCESS,
  constants.STORAGE_FIND_ALL_FAILURE,

  constants.ORBIT_DB_CREATE_DATABASE,
  constants.ORBIT_DB_CREATE_DATABASE_SUCCESS,
  constants.ORBIT_DB_CREATE_DATABASE_FAILURE,
  constants.ORBIT_DB_OPEN_DATABASE,
  constants.ORBIT_DB_OPEN_DATABASE_SUCCESS,
  constants.ORBIT_DB_OPEN_DATABASE_FAILURE,
  constants.ORBIT_DB_ADD_ENTRY,
  constants.ORBIT_DB_ADD_ENTRY_SUCCESS,
  constants.ORBIT_DB_ADD_ENTRY_FAILURE,
  constants.ORBIT_DB_GET_ENTRY,
  constants.ORBIT_DB_GET_ENTRY_SUCCESS,
  constants.ORBIT_DB_GET_ENTRY_FAILURE,
  constants.ORBIT_DB_GET_ALL_ENTRIES,
  constants.ORBIT_DB_GET_ALL_ENTRIES_SUCCESS,
  constants.ORBIT_DB_GET_ALL_ENTRIES_FAILURE,
];

const clientActions: string[] = [
  constants.TOGGLE_NOTIFICATION_PANEL,
  constants.TOGGLE_KEYCHAIN_PANEL,
  constants.KEYCHAIN_CREATE,
  constants.KEYCHAIN_LIST,
  constants.KEYCHAIN_SIGN,
  constants.KEYCHAIN_REMOVE_KEY,
  constants.CLEAR_NOTIFICATION,
  constants.CLEAR_ALL_NOTIFICATIONS,
  constants.TOGGLE_LOADER_PANEL,
  constants.TOGGLE_STATUS_BAR_PANEL,
  constants.LOGGER_WRITE_SUCCESS,
  constants.TOGGLE_PEERS_BAR_PANEL,
  constants.TOGGLE_HOME,
  constants.TOGGLE_APP_HOME,
  constants.TOGGLE_SEARCH_PANEL,
  constants.SWITCH_DAPP,
  constants.ADD_APP_ITEM,
  constants.APPS_FEED_RESIZE,
  constants.SET_TRAY_COUNTER,
  constants.SET_TRAY_PROGRESS,
  constants.REMOVE_TRAY_ITEM,
  constants.MARKET_DOWNLOAD_DAPP,
  constants.TOGGLE_PERMISSION,
  constants.GRANT_PERMISSIONS,
];

const fileManagerActions: string[] = [
  constants.FILE_MANAGER_OPEN_DIALOG,
  constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS,
  constants.FILE_MANAGER_OPEN_DIALOG_FAILURE,
  // constants.SHOW_FILE_ENTRIES
];

const networkActions: string[] = [
  constants.NETWORK_SUBSCRIBE,
  constants.NETWORK_SUBSCRIBE_SUCCESS,
  constants.NETWORK_SUBSCRIBE_FAILURE,
  constants.NETWORK_UNSUBSCRIBE,
  constants.NETWORK_UNSUBSCRIBE_SUCCESS,
  constants.NETWORK_UNSUBSCRIBE_FAILURE,
  constants.NETWORK_GET_BLOCK,
  constants.NETWORK_GET_BLOCK_SUCCESS,
  constants.NETWORK_GET_BLOCK_FAILURE,
  constants.SHOW_BLOCK,
];

const ipfsActions: string[] = [
  constants.IPFS_STORAGE_UPLOAD_FILE,
  constants.IPFS_STORAGE_UPLOAD_FILE_SUCCESS,
  constants.IPFS_STORAGE_UPLOAD_FILE_FAILURE,
  constants.IPFS_STORAGE_DOWNLOAD_FILE,
  constants.IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS,
  constants.IPFS_STORAGE_DOWNLOAD_FILE_FAILURE,
  constants.IPFS_ROOM_SUBSCRIBE,
  constants.IPFS_ROOM_SUBSCRIBE_SUCCESS,
  constants.IPFS_ROOM_SUBSCRIBE_FAILURE,
  constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST,
  constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_SUCCESS,
  constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_FAILURE,
  constants.IPFS_ROOM_SEND_MESSAGE_TO_DAPP,
  constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER,
  constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_SUCCESS,
  constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_FAILURE,
  constants.IPFS_ROOM_PEER_JOINED,
  constants.IPFS_ROOM_PEER_LEFT,
  constants.IPFS_ROOM_LEAVE,
  constants.IPFS_ROOM_LEAVE_SUCCESS,
  constants.IPFS_ROOM_LEAVE_FAILURE,
];

const pmActions: string[] = [
  constants.CLOSE_MANAGER,
  constants.TOGGLE_PERMISSION,
  constants.GRANT_PERMISSIONS,
  constants.LOAD_PERMISSIONS,
];

const loggerActions: string[] = [
  constants.LOGGER_WRITE,
  constants.LOGGER_WRITE_SUCCESS,
  constants.LOGGER_WRITE_FAILURE,
];

const keychainActions: string[] = [
  constants.KEYCHAIN_CREATE,
  constants.KEYCHAIN_CREATE_SUCCESS,
  constants.KEYCHAIN_CREATE_FAILURE,
  constants.KEYCHAIN_LIST,
  constants.KEYCHAIN_LIST_SUCCESS,
  constants.KEYCHAIN_LIST_FAILURE,
  constants.KEYCHAIN_SIGN,
  constants.KEYCHAIN_SIGN_SUCCESS,
  constants.KEYCHAIN_SIGN_FAILURE,
];

const orbitDbActions: string[] = [
  constants.ORBIT_DB_CREATE_DATABASE,
  constants.ORBIT_DB_CREATE_DATABASE_SUCCESS,
  constants.ORBIT_DB_CREATE_DATABASE_FAILURE,
  constants.ORBIT_DB_OPEN_DATABASE,
  constants.ORBIT_DB_OPEN_DATABASE_SUCCESS,
  constants.ORBIT_DB_OPEN_DATABASE_FAILURE,
  constants.ORBIT_DB_ADD_ENTRY,
  constants.ORBIT_DB_ADD_ENTRY_SUCCESS,
  constants.ORBIT_DB_ADD_ENTRY_FAILURE,
  constants.ORBIT_DB_GET_ENTRY,
  constants.ORBIT_DB_GET_ENTRY_SUCCESS,
  constants.ORBIT_DB_GET_ENTRY_FAILURE,
  constants.ORBIT_DB_GET_ALL_ENTRIES,
  constants.ORBIT_DB_GET_ALL_ENTRIES_SUCCESS,
  constants.ORBIT_DB_GET_ALL_ENTRIES_FAILURE,
];

const checkGranted = (state: IState, dappName: string, actionType: string) => {
  let permissionName: Permission = null;
  if (fileManagerActions.includes(actionType)) {
    permissionName = constants.PERMISSION_NAME_FILE_MANAGER;
  }
  if (networkActions.includes(actionType)) {
    permissionName = constants.PERMISSION_NAME_NETWORK;
  }
  if (ipfsActions.includes(actionType)) {
    permissionName = constants.PERMISSION_NAME_IPFS;
  }
  if (loggerActions.includes(actionType)) {
    permissionName = constants.PERMISSION_NAME_LOGGER;
  }
  if (keychainActions.includes(actionType)) {
    permissionName = constants.PERMISSION_NAME_KEYCHAIN;
  }
  if (orbitDbActions.includes(actionType)) {
    permissionName = constants.PERMISSION_NAME_ORBIT_DB;
  }
  if (permissionName) {
    return checkGrantedForPermission(state, dappName, permissionName);
  }
  return true;
};

const checkGrantedForPermission = (state: IState, dappName: string, permissionName: Permission) => {
  if (state.permissionManager.grantedApps.includes(dappName) &&
    state.permissionManager.permissions[dappName] &&
    state.permissionManager.permissions[dappName].includes(permissionName)) {
    console.log(`Dapp "${dappName}" has privileges to use ${permissionName}}. OK`);
    return true;
  }
  console.log(`Dapp "${dappName}" has no privileges to use ${permissionName}}`);
  return false;
};

const getSourceDappName = (globalId: RendererConf[], action: any) => {
  const dapp = globalId.find(item => item.id === action.meta.sourceUUID);
  if (!dapp) {
    console.log('Dapp not found in globalId by uuid: ', action.meta.sourceUUID);
    return null;
  }
  return dapp.name;
};

export const validatePermissionAction = (globalId: RendererConf[]) => {
  return (store: any) => (next: Dispatch<Action>) => <A extends Action>(action: A) => {
    if (action.payload && action.payload.hasOwnProperty('status')) {

      if (action.payload.status === 'dapp') {
        if (!dappActions.includes(action.type)) {
          console.log(`Cancelled for dapp ${action.type}`);
        } else {
          const dappName = getSourceDappName(globalId, action);

          if (checkGranted(store.getState(), dappName, action.type)) {
            return next(action);
          }
          console.log(`Action "${action.type}" is not granted for dapp "${dappName}"`);
        }

      } else if (action.payload.status === 'client') {
        if (action.type === constants.TOGGLE_NOTIFICATION_PANEL) { // why this logic applied only for TOGGLE_NOTIFICATION_PANEL action? Do we need this logic?
          const clientObj = globalId.find(renObj => renObj.status === 'client');
          if (clientObj) {
            const payloadUuidObj = {
              uuid: clientObj.id,
            };
            action.payload = Object.assign(action.payload, payloadUuidObj);
          }
        }
        if (clientActions.includes(action.type)) {
          return next(action);
        }
        console.log('Cancelled for client: ', action.type);

      } else if (action.payload.status === 'permission_manager') {
        if (pmActions.includes(action.type)) {
          return next(action);
        }
        console.log(`Cancelled for permission manager ${action.type}`);
      }
    } else {
      console.log('no status: ', action);
      return next(action);
    }
  };
};
