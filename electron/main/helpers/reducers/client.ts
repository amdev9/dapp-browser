import { 
  SWITCH_DAPP, 
  TOGGLE_HOME, 
  TOGGLE_NOTIFICATION_PANEL, 
  TOGGLE_LOADER_PANEL, 
  TOGGLE_STATUS_BAR_PANEL,
  TOGGLE_APP_HOME
} from '../constants';
import { TrayAction } from '../actions/client';
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

export function client(state: Client = initialState, action: TrayAction) {
  switch (action.type) {
    case SWITCH_DAPP:
      const dappId = action.payload.targetDappId; 
      const dappName = action.payload.targetDappName; 
      return {
        ...state,
        activeDapp: { id: dappId, appName: dappName },
        isHome: false
      }
    
    case TOGGLE_HOME:
      const isHome = action.payload.isHome;
      return { 
        ...state, 
        isHome: isHome,
        activeDapp: { 
          id: 0, 
          appName: null 
        }
      };
    
    case TOGGLE_APP_HOME: 
      return {
        ...state,
        isHome: false, 
        activeDapp: { 
          dappId: 1,
          appName: action.payload.targetDappName 
        }
      }

    case TOGGLE_NOTIFICATION_PANEL:
      return {
        ...state, 
        notification: {
          isOpen: !state.notification.isOpen
        }
      };

    case TOGGLE_LOADER_PANEL:
      return {
        ...state, 
        loader: {
          isOpen: !state.loader.isOpen
        }
      };

    case TOGGLE_STATUS_BAR_PANEL:
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
