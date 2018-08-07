import { SWITCH_DAPP } from '../actions/client';

export function client(state = {}, action) {
  switch (action.type) {
    case SWITCH_DAPP:
      const dappId = action.payload.targetDappId; // dapp id
      return {
        ...state,
        activeDapp: dappId 
      }
    
    default:
      return state;
  }
}
