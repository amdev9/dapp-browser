// validate permissions for actions

// import { SWITCH_DAPP, SEND_PING_MESSAGE } from '../actions/client';
import { INCREMENT_COUNTER, DECREMENT_COUNTER, START_COUNTDOWN, INCREMENT_ASYNC, CANCEL_INCREMENT_ASYNC } from '../actions/counter';
 

import { Middleware } from 'redux';

export const validatePermissionAction: Middleware = () => next => (action) => {

  console.log(action); //next todo fix permissions
  return next(action);

  // if (action.payload.status === 'dapp') {
  //   switch (action.type) {
  //     case INCREMENT_COUNTER: 
  //       console.log(action);
  //       return next(action);
  //     case DECREMENT_COUNTER:
  //       console.log(action);
  //       return next(action);
  //     case SEND_PING_MESSAGE:
  //       console.log(action);
  //       return next(action);
  //     default:
  //       console.log("Cancelled for dapp");
  //   }
  // } else if (action.payload.status == 'client') {
  //   switch (action.type) {
  //     case INCREMENT_COUNTER: 
  //       console.log(action);
  //       return next(action);
  //     case DECREMENT_COUNTER:
  //       console.log(action);
  //       return next(action);
  //     case SWITCH_DAPP:
  //       console.log(action);
  //       return next(action);
  //     case START_COUNTDOWN:
  //       console.log(action);
  //       return next(action);
  //     case INCREMENT_ASYNC:
  //       console.log(action);
  //       return next(action);
  //     case CANCEL_INCREMENT_ASYNC:
  //       console.log(action);
  //       return next(action);
  //     default:
  //       console.log("Cancelled for client");
  //   }
  // }
  
};

 
