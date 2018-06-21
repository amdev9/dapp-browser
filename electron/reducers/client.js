const { SWITCH_DAPP } = require('../actions/client');

function client(state = 0, action) {
  switch (action.type) {
    case SWITCH_DAPP:
      return state - 1;
    default:
      return state;
  }
}

module.exports = client;