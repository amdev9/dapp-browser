import { SWITCH_DAPP, TrayAction } from '../actions/tray';
import { Tray } from './state';

const initialState: Tray = {
  items: [],
  activeDapp: null,
  pinned: []
}

export default function client(state: Tray = initialState, action: TrayAction) {
  switch (action.type) {
    case SWITCH_DAPP:
      const dappId = action.payload.targetDappId;
      return {
        ...state,
        activeDapp: dappId 
      }
    
    default:
      return state;
  }
}
