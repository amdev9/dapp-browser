
import { Dispatch } from 'redux';
import { Action } from './configureStore';
import { RendererConf } from '../../createDappView';
import * as constants from '../constants';

export const validatePermissionAction = (globalId: RendererConf[]) => {
  return () => (next: Dispatch<void>) => <A extends Action>(action: A) => {
    if (action.payload && action.payload.hasOwnProperty('status')) {
      if (action.payload.status === 'dapp') {
        switch (action.type) {
          case constants.INTENT_OPEN_CHANNELS:
 
          case constants.OPEN_CHANNEL:
          case constants.OPEN_CHANNEL_SUCCESS:
          case constants.BIND_OPEN_CHANNELS:
          case constants.BIND_OPEN_CHANNELS_DONE:


          case constants.FILE_MANAGER_OPEN_DIALOG:
          case constants.SHOW_FILE_ENTRIES:
          
            return next(action);
          default:
            console.log("Cancelled for dapp " + action.type);
        }
      } else if (action.payload.status == 'client') {
        switch (action.type) {
          case constants.TOGGLE_NOTIFICATION_PANEL:
            let clientObj = globalId.find(renObj => renObj.status === 'client');
            if (clientObj) {
              const payloadUuidObj = {
                uuid: clientObj.id,
              };
              action.payload = Object.assign(action.payload, payloadUuidObj)
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
      }
    } else {
      console.log("no status: ", action);
      return next(action);
    }
  }
};


