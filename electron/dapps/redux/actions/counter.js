const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
const SEND_PING_MESSAGE = 'SEND_PING_MESSAGE';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

function sendPingMessage() {
  return {
    type: SEND_PING_MESSAGE
  };
}
 
module.exports = {
  decrement,
  increment,
  sendPingMessage,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  SEND_PING_MESSAGE
}