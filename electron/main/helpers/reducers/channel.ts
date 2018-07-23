import { ActionType } from 'typesafe-actions';
import * as channels from '../actions/channel';
export type ChannelsAction = ActionType<typeof channels>;

export interface ChannelState {
   
}

export function channel(state = {}, action: ChannelsAction) {
  switch (action.type) {
    case channels.OPEN_CHANNEL:
    case channels.INTENT_OPEN_CHANNELS:

    default:
      return state;
  }
}

 
