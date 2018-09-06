import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
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
  TOGGLE_STATUS_BAR_PANEL,
  TOGGLE_LOADER_PANEL,
  BIND_OPEN_CHANNELS_DONE,
  BIND_OPEN_CHANNELS,
  OPEN_CHANNEL_SUCCESS,
  OPEN_CHANNEL,
  INTENT_OPEN_CHANNELS,
  APPS_FEED_RESIZE
} from '../constants';

export const validatePermissionAction = (globalId: RendererConf[]) => {
  return () => (next: Dispatch<void>) => <A extends Action>(action: A) => {
    if (action.payload && action.payload.hasOwnProperty('status')) {
      if (action.payload.status === 'dapp') {
        switch (action.type) {
          case INTENT_OPEN_CHANNELS:
          case OPEN_CHANNEL:
          case OPEN_CHANNEL_SUCCESS:
          case BIND_OPEN_CHANNELS:
          case BIND_OPEN_CHANNELS_DONE:
          case INCREMENT_COUNTER:
          case DECREMENT_COUNTER:
            return next(action);
          default:
            console.log("Cancelled for dapp");
        }
      } else if (action.payload.status == 'client') {
        switch (action.type) {
          case TOGGLE_NOTIFICATION_PANEL:
            let clientObj = globalId.find(renObj => renObj.status === 'client');
            if (clientObj) {
              const payloadUuidObj = {
                uuid: clientObj.id,
              };
              action.payload = Object.assign(action.payload, payloadUuidObj)
            }
            return next(action);

          case INCREMENT_COUNTER:
          case DECREMENT_COUNTER:
          case CLEAR_NOTIFICATION:
          case CLEAR_ALL_NOTIFICATIONS:
          case TOGGLE_LOADER_PANEL:
          case TOGGLE_STATUS_BAR_PANEL:
          case TOGGLE_HOME:
          case TOGGLE_APP_HOME:
          case SWITCH_DAPP:
          case ADD_APP_ITEM:
          case APPS_FEED_RESIZE:
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


