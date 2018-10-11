
import { Dispatch } from 'redux';
import { Action } from './configureStore';
import { RendererConf } from '../../createDappView';
 
import * as constants from '../constants';
import {IState} from "../reducers/state";
const dappActions: string[] = [
  constants.INTENT_OPEN_CHANNELS,
  constants.OPEN_CHANNEL,
  constants.OPEN_CHANNEL_SUCCESS,
  constants.BIND_OPEN_CHANNELS_DONE,
  constants.FILE_MANAGER_OPEN_DIALOG,
  constants.SHOW_FILE_ENTRIES
];

const fileManagerActions = [constants.FILE_MANAGER_OPEN_DIALOG, constants.SHOW_FILE_ENTRIES];
const FILE_MANAGER_PERMISSION_NAME = "storage";

const checkGranted = (state: IState, dappName: string) => {
  
  if (state.permissionManager.grantedApps.indexOf(dappName) === -1) {
    console.log(`Dapp "${dappName}" has no privileges to use FileManager`);
    return false;
  }
  if (state.permissionManager.permissions[dappName].indexOf(FILE_MANAGER_PERMISSION_NAME) === -1) {
    console.log(`Dapp "${dappName}" has no privileges to use FileManager`);
    return false;
  }
  console.log(`Dapp "${dappName}" has privileges to use FileManager. OK`);
  return true;
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
  return (store: any) => (next: Dispatch<void>) => function <A extends Action>(action: A) {
    if (action.payload && action.payload.hasOwnProperty('status')) {
      if (action.payload.status === 'dapp') {
        if (dappActions.indexOf(action.type) === -1) {
          console.log("Cancelled for dapp " + action.type);
        } else {
          const dappName = getSourceDappName(globalId, action);
          
          if (fileManagerActions.indexOf(action.type) !== -1) {
            if (checkGranted(store.getState(), dappName)) {
              return next(action);
            } else {
              console.log(`Action "${action.type}" is not granted for FileManager and dapp "${dappName}"`);
            }
          } else {
            return next(action);
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
            console.log("Cancelled for client");
        }
      } else if (action.payload.status === 'permission_manager') {
        switch (action.type) {
          case constants.CLOSE_MANAGER:
          case constants.TOGGLE_PERMISSION:
          case constants.GRANT_PERMISSIONS:
          case constants.LOAD_PERMISSIONS:
            return next(action);
          default:
            console.log("Cancelled for permission manager");
        }
      }
    } else {
      console.log("no status: ", action);
      return next(action);
    }
  };
};


