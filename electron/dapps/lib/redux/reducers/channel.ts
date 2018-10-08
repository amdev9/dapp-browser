import { INTENT_OPEN_CHANNELS } from '../actions/channel';

export function channel(state = 0, action: any) {
  switch (action.type) {
    case INTENT_OPEN_CHANNELS:
 
    default:
      return state;
  }
}

 