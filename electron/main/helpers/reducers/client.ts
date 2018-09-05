import * as clients from '../actions/client';
import { Client } from './state';
 

const initialState: Client = {
  activeDapp: {
    id: 0,
    appName: null
  },
  isHome: true,
  notification: {isOpen: false},
  loader: {isOpen: false},
  statusBar: {isOpen: false}
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

    case clients.TOGGLE_NOTIFICATION_PANEL:
      return {
        ...state, 
        notification: {
          isOpen: !state.notification.isOpen
        }
      };

    case clients.TOGGLE_LOADER_PANEL:
      return {
        ...state, 
        loader: {
          isOpen: !state.loader.isOpen
        }
      };

    case clients.TOGGLE_STATUS_BAR_PANEL:
      return {
        ...state, 
        statusBar: {
          isOpen: !state.statusBar.isOpen
        }
      };

    default:
      return state;
  }
}
