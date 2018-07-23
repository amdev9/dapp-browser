import { ActionType } from 'typesafe-actions';
import * as clients from '../actions/client';
export type ClientsAction = ActionType<typeof clients>;

export function client(state = {}, action: ClientsAction) {
  switch (action.type) {
    case clients.SWITCH_DAPP:
      const dappId = action.payload.targetDappId; // dapp id
      return {
        ...state,
        activeDapp: dappId 
      }
    
    case clients.SEND_PING_MESSAGE:  
      return state;

    default:
      return state;
  }
}
