
import { Dispatch } from 'redux';
import { Action } from './configureStore';
import { RendererConf } from '../../createDappView';
import {
  TOGGLE_NOTIFICATION_PANEL,
  CLEAR_NOTIFICATION,
  CLEAR_ALL_NOTIFICATIONS,
  ADD_APP_ITEM,
  SWITCH_DAPP,
  TOGGLE_HOME,
  TOGGLE_APP_HOME,
  SET_TRAY_COUNTER,
  SET_TRAY_PROGRESS,
  TOGGLE_STATUS_BAR_PANEL,
  TOGGLE_PEERS_BAR_PANEL,
  TOGGLE_LOADER_PANEL,
  TOGGLE_SETTINGS_PANEL,
  TOGGLE_SEARCH_PANEL,
  BIND_OPEN_CHANNELS_DONE,
  BIND_OPEN_CHANNELS,
  OPEN_CHANNEL_SUCCESS,
  OPEN_CHANNEL,
  INTENT_OPEN_CHANNELS,
  APPS_FEED_RESIZE,
  REMOVE_TRAY_ITEM,
  INTENT_OPEN_FILE,
  CLOSE_MANAGER,
  TOGGLE_PERMISSION,
  GRANT_PERMISSIONS,
} from '../constants';

export const validatePermissionAction = (globalId: RendererConf[]) => {
  return () => (next: Dispatch<void>) => <A extends Action>(action: A) => {
    if (action.payload && action.payload.hasOwnProperty('status')) {
      if (action.payload.status === 'dapp') {
        switch (action.type) {  // todo switch / case structure can be rewritten as allowedActions.includes(actionType) which seems more appropriate here
          case INTENT_OPEN_CHANNELS:
          case INTENT_OPEN_FILE:
          case OPEN_CHANNEL:
          case OPEN_CHANNEL_SUCCESS:
          case BIND_OPEN_CHANNELS:
          case BIND_OPEN_CHANNELS_DONE:
            return next(action);
          default:
            console.log("Cancelled for dapp");
        }
      } else if (action.payload.status === 'client') {
        switch (action.type) {
          case TOGGLE_NOTIFICATION_PANEL:
            let clientObj = globalId.find(renObj => renObj.status === 'client');
            if (clientObj) {
              const payloadUuidObj = {
                uuid: clientObj.id,
              };
              action.payload = Object.assign(action.payload, payloadUuidObj);
            }
            return next(action);

          case CLEAR_NOTIFICATION:
          case CLEAR_ALL_NOTIFICATIONS:
          case TOGGLE_LOADER_PANEL:
          case TOGGLE_SETTINGS_PANEL:
          case TOGGLE_STATUS_BAR_PANEL:
          case TOGGLE_PEERS_BAR_PANEL:
          case TOGGLE_HOME:
          case TOGGLE_APP_HOME:
          case TOGGLE_SEARCH_PANEL:
          case SWITCH_DAPP:
          case ADD_APP_ITEM:
          case APPS_FEED_RESIZE:
          case SET_TRAY_COUNTER:
          case SET_TRAY_PROGRESS:
          case REMOVE_TRAY_ITEM:
            return next(action);
          default:
            console.log("Cancelled for client");
        }
      } else if (action.payload.status === 'permission_manager') {
        switch (action.type) {
          case CLOSE_MANAGER:
          case TOGGLE_PERMISSION:
          case GRANT_PERMISSIONS:
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


