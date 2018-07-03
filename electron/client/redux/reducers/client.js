import { SWITCH_DAPP, SEND_PING_MESSAGE } from '../actions/client';

export function client(state = {}, action) {
  switch (action.type) {
    case SWITCH_DAPP:
      const dappId = action.payload.targetDappId; // dapp id
      return {
        ...state,
        activeDapp: dappId 
      }
    
    case SEND_PING_MESSAGE:  
      return state;

    default:
      return state;
  }
}
