const { INCREMENT_COUNTER, DECREMENT_COUNTER, SEND_PING_MESSAGE } = require('../actions/counter');

function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    case SEND_PING_MESSAGE:
      // sending: true
      return state;
    default:
      return state;
  }
}

module.exports = counter;