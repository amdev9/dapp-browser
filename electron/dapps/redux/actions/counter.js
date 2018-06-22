const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

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

module.exports = {
  decrement,
  increment,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
}