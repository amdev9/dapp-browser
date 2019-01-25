import { Dispatch } from 'redux';
import { Action } from './configureStore';
import { RendererConf } from '../constants/globalVariables';
import * as constants from '../constants';
import { IState, Permission } from '../reducers/state';
import { getModuleActionTypes } from '../utils/actionUtils';

import { constants as IpfsRoomConstants } from '../../modules/IpfsRoom';
import { constants as IpfsStorageConstants } from '../../modules/IpfsStorage';
import { constants as FileManagerConstants } from '../../modules/FileManager';
import { constants as NotificationConstants } from '../../modules/Notification';
import { constants as HttpProtocolConstants } from '../../modules/HttpProtocol';
import { constants as OrbitDbConstants } from '../../modules/OrbitDb';
import { constants as AppsManagerConstants } from '../../modules/AppsManager';
import { constants as DappConstants } from '../../modules/Dapp';
import { constants as StorageConstants } from '../../modules/Storage';

import { constants as ClientDappConstants } from 'ClientApp/modules/Dapp';
import { constants as ClientNotificationConstants } from 'ClientApp/modules/Notification';
import * as ClientIpfsStorageConstants from 'ClientApp/modules/IpfsStorage/constants';
import * as ClientAppsManagerConstants from 'ClientApp/modules/AppsManager/constants';
import * as ClientAppConstants from 'ClientApp/redux/constants';

const ipfsRoomActionTypes = getModuleActionTypes(IpfsRoomConstants);
const ipfsStorageActionTypes = getModuleActionTypes(IpfsStorageConstants);
const fileManagerActionTypes = getModuleActionTypes(FileManagerConstants);
const notificationActionTypes = getModuleActionTypes(NotificationConstants);
const httpProtocolActionTypes = getModuleActionTypes(HttpProtocolConstants);
const orbitDbActionTypes = getModuleActionTypes(OrbitDbConstants);
const appsManagerActionTypes = getModuleActionTypes(AppsManagerConstants);
const dappsActionTypes = getModuleActionTypes(DappConstants);
const storageActionTypes = getModuleActionTypes(StorageConstants);

const clientDappsActionTypes = getModuleActionTypes(ClientDappConstants);
const clientNotificationActionTypes = getModuleActionTypes(ClientNotificationConstants);
const clientIpfsStorageActionTypes = getModuleActionTypes(ClientIpfsStorageConstants);
const clientAppsManagerActionTypes = getModuleActionTypes(ClientAppsManagerConstants);

const dappActions: string[] = [
  constants.INTENT_OPEN_CHANNELS,
  constants.OPEN_CHANNEL,
  constants.OPEN_CHANNEL_SUCCESS,
  constants.BIND_OPEN_CHANNELS_DONE,
  constants.TOGGLE_APP_HOME_SUCCESS,

  ...appsManagerActionTypes,
  ...ipfsStorageActionTypes,
  ...ipfsRoomActionTypes,
  ...fileManagerActionTypes,
  ...notificationActionTypes,
  ...httpProtocolActionTypes,
  ...orbitDbActionTypes,
  ...dappsActionTypes,
  ...storageActionTypes,

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
  constants.KEYCHAIN_PUBLIC_KEY,
  constants.KEYCHAIN_PUBLIC_KEY_SUCCESS,
  constants.KEYCHAIN_PUBLIC_KEY_FAILURE,
  constants.KEYCHAIN_SHOW_RESULT,
  constants.ETHEREUM_BUILD_TRANSACTION,
  constants.ETHEREUM_PUBLISH_TRANSACTION,
  constants.ETHEREUM_PUBLIC_TO_ADDRESS,
];

const clientActions: string[] = [
  constants.TOGGLE_NOTIFICATION_PANEL,
  constants.TOGGLE_SETTINGS_PANEL,
  constants.TOGGLE_KEYCHAIN_PANEL,
  constants.KEYCHAIN_CREATE,
  constants.KEYCHAIN_LIST,
  constants.KEYCHAIN_LOCK,
  constants.KEYCHAIN_UNLOCK,
  constants.KEYCHAIN_SIGN,
  constants.KEYCHAIN_SELECT_KEY,
  constants.KEYCHAIN_REMOVE_KEY,
  constants.CLIENT_ADD_NOTIFICATION,
  constants.CLIENT_CLEAR_ALL_NOTIFICATIONS,
  constants.CLIENT_CLEAR_NOTIFICATION,
  constants.TOGGLE_LOADER_PANEL,
  constants.TOGGLE_STATUS_BAR_PANEL,
  constants.LOGGER_WRITE_SUCCESS,
  constants.TOGGLE_PEERS_BAR_PANEL,
  constants.TOGGLE_HOME,
  constants.CLIENT_TOGGLE_HOME,
  constants.TOGGLE_APP_HOME,
  constants.TOGGLE_SEARCH_PANEL,
  constants.ADD_APP_ITEM,
  constants.SET_TRAY_PROGRESS,
  constants.REMOVE_TRAY_ITEM,
  constants.MARKET_DOWNLOAD_DAPP,
  constants.TOGGLE_PERMISSION,
  constants.GRANT_PERMISSIONS,
  ClientAppConstants.CLIENT_SWITCH_DAPP,

  ...appsManagerActionTypes,

  ...clientNotificationActionTypes,
  ...clientDappsActionTypes,
  ...clientIpfsStorageActionTypes,
  ...clientAppsManagerActionTypes,
];

const fileManagerActions: string[] = [
  ...fileManagerActionTypes,
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
  ...ipfsStorageActionTypes,
  ...ipfsRoomActionTypes,
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
  ...orbitDbActionTypes,
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
