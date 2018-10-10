import { OPEN_CHANNEL, INTENT_OPEN_CHANNELS } from '../constants';
import { ActionType } from 'typesafe-actions';
import * as channelActions from '../actions/channel';

export type ChannelAction = ActionType<typeof channelActions>;

export function channel(state = {}, action: ChannelAction) {
  switch (action.type) {
    case OPEN_CHANNEL:
    case INTENT_OPEN_CHANNELS:

    default:
      return state;
  }
}
