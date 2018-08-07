import { OPEN_CHANNEL, INTENT_OPEN_CHANNELS } from '../constants';

export function channel(state = {}, action) {
  switch (action.type) {
    case OPEN_CHANNEL:
    case INTENT_OPEN_CHANNELS:

    default:
      return state;
  }
}

 
