// validate permissions for actions

// import { SWITCH_DAPP, SEND_PING_MESSAGE } from '../actions/client';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import { Dispatch } from 'redux';
import { Action } from './configureStore';
import { RendererConf } from '../../createDappView';

export const validatePermissionAction = (globalId: RendererConf[]) => {
  return () => (next: Dispatch<void>) => <A extends Action>(action: A) => {
    console.log('validate', action); //next todo fix permissions

    if (action.payload && action.payload.hasOwnProperty('status')) {
      if (action.payload.status === 'dapp') {
        switch (action.type) {
          case 'INTENT_OPEN_CHANNELS':
            
          case 'OPEN_CHANNEL':
             
          case 'OPEN_CHANNEL_SUCCESS':
            
          case 'BIND_OPEN_CHANNELS':
           
          case 'BIND_OPEN_CHANNELS_DONE':
    
            return next(action);
  
          case INCREMENT_COUNTER: 
            console.log(action);
            return next(action);
          case DECREMENT_COUNTER:
            console.log(action);
            return next(action);
          default:
            console.log("Cancelled for dapp");
        }
      } else if (action.payload.status == 'client') {
        switch (action.type) {
          case INCREMENT_COUNTER: 
            console.log(action);
            return next(action);
          case DECREMENT_COUNTER:
            console.log(action);
            return next(action);
          case 'ADD_APP_ITEM':
            console.log(action);
            return next(action);
          case 'SWITCH_DAPP': 
            console.log(action);
            return next(action);
          case 'TOGGLE_NOTIFICATION_PANEL':
            let clientObj = globalId.find(renObj => renObj.status === 'client');
            if (clientObj) {
              const payloadUuidObj = { 
                uuid: clientObj.id,
              };
              action.payload = Object.assign(action.payload, payloadUuidObj) 
            }
            return next(action);
          case 'CLEAR_NOTIFICATION_GROUP':
            console.log(action);
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

 
