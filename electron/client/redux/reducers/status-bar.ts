import {TOGGLE_PEERS_BAR_PANEL, TOGGLE_STATUS_BAR_PANEL, LOGGER_WRITE, LOGGER_WRITE_SUCCESS} from '../constants';
 
import { StatusBarPanel } from './state';

const initialState: StatusBarPanel = {
  items: {
    'Russia, Moscow': {
      status: 0,
      peers: 25,
      name: 'Russia, Moscow',
      nodesTotal: 56430,
      nodes: 76,
      timeTotal: 120000,
      time: 28000
    },
    'Germany, Berlin': {
      status: 1,
      peers: 34,
      name: 'Germany, Berlin',
      nodesTotal: 26530,
      nodes: 457,
      timeTotal: 120000,
      time: 66000
    },
    'Germany, Berlin123': {
      status: 1,
      peers: 34,
      name: 'Germany, Berlin123',
      nodesTotal: 26530,
      nodes: 457,
      timeTotal: 120000,
      time: 66000
    }
  },
  isOpen: false,
  isPeersOpen: false,
  loggerWrite: false
};

export default function statusBar(state: StatusBarPanel = initialState, action: any) { //@todo combine with notification.ts
  switch (action.type) {
    case TOGGLE_STATUS_BAR_PANEL:
      //if (action.payload && action.payload.hasOwnProperty('isOpen')) {
      //return { ...state, isOpen: action.payload.isOpen };
      //} else {
      return { ...state, isOpen: !state.isOpen };
    //}

    case TOGGLE_PEERS_BAR_PANEL:
      return { ...state, isPeersOpen: !state.isPeersOpen };
      
    case LOGGER_WRITE:
      return {...state, loggerWrite: false};
      
    case LOGGER_WRITE_SUCCESS:
      return {...state, loggerWrite: true};

    default:
      return state;
  }
}
