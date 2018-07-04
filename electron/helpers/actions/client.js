const SWITCH_DAPP = 'SWITCH_DAPP';
const SEND_PING_MESSAGE = 'SEND_PING_MESSAGE';


//todo add openChannel action with channelId params
function openChannel(channelId, rendererId) { // fix
  return {
    type: OPEN_CHANNEL,
    channelId: channelId,
    rendererId: rendererId
  };
}

function switchDapp() { // fix
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
  openChannel,
  switchDapp,
  increment,
  SWITCH_DAPP,
  SEND_PING_MESSAGE
}