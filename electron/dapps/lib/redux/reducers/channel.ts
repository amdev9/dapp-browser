import * as constants from '../constants';

export function channel(state = 0, action: any) {
  switch (action.type) {
    case constants.INTENT_OPEN_CHANNELS:

    default:
      return state;
  }
}

