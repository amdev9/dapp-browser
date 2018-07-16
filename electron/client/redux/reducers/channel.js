const { OPEN_CHANNEL, INTENT_OPEN_CHANNELS } = require('../actions/channel');

function channel(state = {}, action) {
  switch (action.type) {
    case OPEN_CHANNEL:
    case INTENT_OPEN_CHANNELS:

    default:
      return state;
  }
}

module.exports = channel;
