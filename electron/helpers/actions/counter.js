const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';


const START_COUNTDOWN = 'START_COUNTDOWN';
const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
const CANCEL_INCREMENT_ASYNC = 'CANCEL_INCREMENT_ASYNC';
const COUNTDOWN_TERMINATED = 'COUNTDOWN_TERMINATED';

// START_COUNTDOWN, INCREMENT_ASYNC, CANCEL_INCREMENT_ASYNC

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
  DECREMENT_COUNTER,

  START_COUNTDOWN,
  INCREMENT_ASYNC,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED

}