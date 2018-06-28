const { SWITCH_DAPP, SEND_PING_MESSAGE } = require('../actions/client');

function client(state = {}, action) {
  switch (action.type) {
    case SWITCH_DAPP:
      const dappId = action.payload.targetDappId; // dapp id
      return {
        ...state,
        activeDapp: dappId 
      }
    
    case SEND_PING_MESSAGE: // HANDLE_MESSAGE_SEND -> OPEN_BINDED_CHANNEL + SENDING_PING_MESSAGE 
      return state;

    default:
      return state;
  }
}

module.exports = client;  