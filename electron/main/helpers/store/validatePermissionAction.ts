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

  constants.IPFS_STORAGE_UPLOAD_FILE,
  constants.IPFS_STORAGE_UPLOAD_FILE_SUCCESS,
  constants.IPFS_STORAGE_UPLOAD_FILE_FAILURE,
  constants.IPFS_STORAGE_DOWNLOAD_FILE,
  constants.IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS,
  constants.IPFS_STORAGE_DOWNLOAD_FILE_FAILURE,

  constants.SHOW_FILE_ENTRIES,
  constants.NETWORK_GET_BLOCK,
  constants.NETWORK_GET_WITNESS,
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
];

const fileManagerActions: string[] = [
  constants.FILE_MANAGER_OPEN_DIALOG,
  constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS,
  constants.FILE_MANAGER_OPEN_DIALOG_FAILURE,
  // constants.SHOW_FILE_ENTRIES
];

const networkActions: string[] = [
  constants.NETWORK_GET_BLOCK,
  constants.SHOW_BLOCK
];

const ipfsActions: string[] = [
  constants.IPFS_STORAGE_UPLOAD_FILE,
  constants.IPFS_STORAGE_UPLOAD_FILE_SUCCESS,
  constants.IPFS_STORAGE_UPLOAD_FILE_FAILURE,
  constants.IPFS_STORAGE_DOWNLOAD_FILE,
  constants.IPFS_STORAGE_DOWNLOAD_FILE_SUCCESS,
  constants.IPFS_STORAGE_DOWNLOAD_FILE_FAILURE,
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
    console.log("Dapp not found in globalId by uuid: ", action.meta.sourceUUID);
    return null;
  }
  return dapp.name;
};

export const validatePermissionAction = (globalId: RendererConf[]) => {
  return (store: any) => (next: Dispatch<void>) => <A extends Action>(action: A) => {
    if (action.payload && action.payload.hasOwnProperty('status')) {
      if (action.payload.status === 'dapp') {
        if (!dappActions.includes(action.type)) {
          console.log("Cancelled for dapp " + action.type);
        } else {
          const dappName = getSourceDappName(globalId, action);

          if (checkGranted(store.getState(), dappName, action.type)) {
            return next(action);
          } else {
            console.log(`Action "${action.type}" is not granted for dapp "${dappName}"`);
          }
        }
      } else if (action.payload.status === 'client') {
        switch (action.type) {
          case constants.TOGGLE_NOTIFICATION_PANEL:
            let clientObj = globalId.find(renObj => renObj.status === 'client');
            if (clientObj) {
              const payloadUuidObj = {
                uuid: clientObj.id,
              };
              action.payload = Object.assign(action.payload, payloadUuidObj);
            }
            return next(action);

          case constants.CLEAR_NOTIFICATION:
          case constants.CLEAR_ALL_NOTIFICATIONS:
          case constants.TOGGLE_LOADER_PANEL:
          case constants.TOGGLE_SETTINGS_PANEL:
          case constants.TOGGLE_STATUS_BAR_PANEL:
          case constants.LOGGER_WRITE_SUCCESS:
          case constants.TOGGLE_PEERS_BAR_PANEL:
          case constants.TOGGLE_HOME:
          case constants.TOGGLE_APP_HOME:
          case constants.TOGGLE_SEARCH_PANEL:
          case constants.SWITCH_DAPP:
          case constants.ADD_APP_ITEM:
          case constants.APPS_FEED_RESIZE:
          case constants.SET_TRAY_COUNTER:
          case constants.SET_TRAY_PROGRESS:
          case constants.REMOVE_TRAY_ITEM:
            return next(action);
          default:
            console.log("Cancelled for client: ", action.type);
        }
      } else if (action.payload.status === 'permission_manager') {
        if (pmActions.includes(action.type)) {
          return next(action);
        } else {
          console.log("Cancelled for permission manager " + action.type);
        }
      }
    } else {
      console.log("no status: ", action);
      return next(action);
    }
  };
};


