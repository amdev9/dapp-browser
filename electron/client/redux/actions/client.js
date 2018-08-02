const SWITCH_DAPP = 'SWITCH_DAPP';
const SEND_PING_MESSAGE = 'SEND_PING_MESSAGE';

function switchDapp(dappName) {
  return {
    type: SWITCH_DAPP,
    payload: { 
      targetDapp: dappName
    }
  };
}

function increment() {
  return {
    type: SEND_PING_MESSAGE
  };
}

module.exports = {
  switchDapp,
  increment,
  SWITCH_DAPP,
  SEND_PING_MESSAGE
}