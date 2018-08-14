import { SWITCH_DAPP, TrayAction } from '../actions/tray';

export default function client(state = {}, action: TrayAction) {
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
