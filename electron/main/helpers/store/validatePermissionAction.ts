// validate permissions for actions

// import { SWITCH_DAPP, SEND_PING_MESSAGE } from '../actions/client';
import { INCREMENT_COUNTER, DECREMENT_COUNTER, START_COUNTDOWN, INCREMENT_ASYNC, CANCEL_INCREMENT_ASYNC } from '../actions/counter';
import { Dispatch } from 'redux';
import { Action } from './configureStore';
import { RendererConf } from '../../createDappView';

export const validatePermissionAction = (globalId: RendererConf[]) => {
  return () => (next: Dispatch<void>) => <A extends Action>(action: A) => {
// Middleware = () => next => (action) => {

  console.log('validate', action); //next todo fix permissions

  if (action.payload.status === 'dapp') {
    switch (action.type) {
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
 
      case START_COUNTDOWN:
        console.log(action);
        return next(action);
      case INCREMENT_ASYNC:
        console.log(action);
        return next(action);
      case CANCEL_INCREMENT_ASYNC:
        console.log(action);
        return next(action);

      case 'TOGGLE_NATIFICATION_PANEL':
        let clientObj = globalId.find(renObj => renObj.status === 'client');
        if (clientObj) {
          const payloadUuidObj = { 
            uuid: clientObj.id,
          };
          action.payload = Object.assign(action.payload, payloadUuidObj) 
        }
        return next(action);

      default:
        console.log("Cancelled for client");
    }
  }
  
};

 
