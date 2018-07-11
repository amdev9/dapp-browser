// Dapp communication protocol
const INTENT_OPEN_CHANNELS = 'INTENT_OPEN_CHANNELS';
const OPEN_CHANNEL = 'OPEN_CHANNEL';
const OPEN_CHANNEL_SUCCESS = 'OPEN_CHANNEL_SUCCESS';
const BIND_OPEN_CHANNELS_DONE = 'BIND_OPEN_CHANNELS_DONE';

// Events API protocol
const INIT_EVENT_SUBSCRIPTION = 'INIT_EVENT_SUBSCRIPTION';
const EVENT_TRIGGERED = 'EVENT_TRIGGERED';
const EVENT_RECEIVED = 'EVENT_RECEIVED';
 
// Component-channel resolver
const INTENT_CHANNEL_DATA_PASS = 'INTENT_CHANNEL_DATA_PASS';
const ACCEPT_CHANNEL_DATA_PASS = 'ACCEPT_CHANNEL_DATA_PASS';

function openChannelIntent() {
  return {
    type: INTENT_OPEN_CHANNELS
  };
}

function openChannel(channelId, rendererId) {
  return {
    type: OPEN_CHANNEL,
    payload: {
      channelId: channelId,
      rendererId: rendererId
    }
  };
}

module.exports = {
  openChannel,
  openChannelIntent,
  OPEN_CHANNEL,
  INTENT_OPEN_CHANNELS
}