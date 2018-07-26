import * as channels from '../actions/channel';
 
export function channel(state = {}, action: channels.Action) {
  switch (action.type) {
    case channels.OPEN_CHANNEL:
    case channels.INTENT_OPEN_CHANNELS:

    default:
      return state;
  }
}

 
