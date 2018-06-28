const { SWITCH_DAPP, SEND_PING_MESSAGE } = require('../actions/client');

function client(state = {}, action) {
  switch (action.type) {
    case SWITCH_DAPP:
      const dappId = action.payload.targetDappId; // dapp id
      return {
        ...state,
        activeDapp: dappId 
      }
    
    case SEND_PING_MESSAGE: //todo HANDLE_MESSAGE_SEND -> INTENT_OPEN_CHANNELS: [name of app] (resolve id of dapp, send push event) - if(ok) -> OPEN_CHANNELS -> BIND_OPEN_CHANNELS -> CHANNELS_OPENED 
      //+ SENDING_PING_MESSAGE 
      return state;

    default:
      return state;
  }
}

module.exports = client;  