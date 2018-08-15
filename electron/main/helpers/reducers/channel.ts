import { OPEN_CHANNEL, INTENT_OPEN_CHANNELS } from '../constants';
import { ChannelAction } from '../actions/channel';

export function channel(state = {}, action: ChannelAction) {
  switch (action.type) {
    case OPEN_CHANNEL:
    case INTENT_OPEN_CHANNELS:

    default:
      return state;
  }
}
