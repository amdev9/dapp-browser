import * as clients from '../actions/client';
 
export function client(state = {}, action: clients.Action) {
  switch (action.type) {
    case clients.SWITCH_DAPP:
      const dappId = action.payload.targetDappId; 
      const dappName = action.payload.targetDappName; 
      return {
        ...state,
        activeDapp: { id: dappId, appName: dappName }
      }
     
    default:
      return state;
  }
}
