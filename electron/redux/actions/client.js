const SWITCH_DAPP = 'SWITCH_DAPP';
const SEND_PING_MESSAGE = 'SEND_PING_MESSAGE';

function switchDapp() {
  return {
    type: SWITCH_DAPP
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