import * as clients from '../actions/client';
import { Client } from './state';
 

const initialState: Client = {
  activeDapp: {
    id: 0,
    appName: null
  }
}

export function client(state: Client = initialState, action: clients.Action) {
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
