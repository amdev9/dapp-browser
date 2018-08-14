import * as counters from '../actions/counter';
 

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
