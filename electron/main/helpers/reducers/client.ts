import * as clients from '../actions/client';
import { Client } from './state';
 

const initialState: Client = {
  activeDapp: {
    id: 0,
    appName: null
  },
  isHome: true
}

export function client(state: Client = initialState, action: clients.TrayAction) {
  switch (action.type) {
    case clients.SWITCH_DAPP:
      const dappId = action.payload.targetDappId; 
      const dappName = action.payload.targetDappName; 
      return {
        ...state,
        activeDapp: { id: dappId, appName: dappName },
        isHome: false
      }
    
    case clients.TOGGLE_HOME:
      const isHome = action.payload.isHome;
      return { 
        ...state, 
        isHome: isHome,
        activeDapp: { 
          id: 0, 
          appName: null 
        }
      };
    default:
      return state;
  }
}
