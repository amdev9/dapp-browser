const { 
  INCREMENT_COUNTER, 
  DECREMENT_COUNTER,
  START_COUNTDOWN,
  INCREMENT_ASYNC,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED 
} = require('../actions/counter');

function countdown(state = 0, action) {
  switch (action.type) {
    case INCREMENT_ASYNC:
      return action.value
    case COUNTDOWN_TERMINATED:
    case CANCEL_INCREMENT_ASYNC:
      return 0;
    default:
      return state
  }
}

function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}

module.exports = {
  counter,
  countdown
};