const { SWITCH_DAPP } = require('../actions/client');

function client(state = {}, action) {
  switch (action.type) {
    case SWITCH_DAPP:

      const dappId = action.payload.targetDappId; // dapp id
      return {
        ...state,
        activeDapp: dappId 
      }

      // return state - 1;
    default:
      return state;
  }
}

module.exports = client;