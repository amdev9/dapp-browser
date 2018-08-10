const { INTENT_OPEN_CHANNELS } = require('../actions/channel');

function channel(state = 0, action) {
  switch (action.type) {
    case INTENT_OPEN_CHANNELS:
 
    default:
      return state;
  }
}

module.exports = channel;