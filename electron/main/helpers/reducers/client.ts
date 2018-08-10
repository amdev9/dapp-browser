import * as clients from '../actions/client';
 
export function client(state = {}, action: clients.Action) {
  switch (action.type) {
    case clients.SWITCH_DAPP:
      const dappId = action.payload.targetDappId; 
      return {
        ...state,
        activeDapp: dappId 
      }
     
    default:
      return state;
  }
}
