import * as counters from '../actions/counter';
 
export function countdown(state = 0, action: counters.Action) {
  switch (action.type) {
    case counters.INCREMENT_ASYNC:
      return action.value
    case counters.COUNTDOWN_TERMINATED:
    case counters.CANCEL_INCREMENT_ASYNC:
      return 0;
    default:
      return state
  }
}

export function counter(state = 0, action: counters.Action) {
  switch (action.type) {
    case counters.INCREMENT_COUNTER:
      return state + 1;
    case counters.DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
