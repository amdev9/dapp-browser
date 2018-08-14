import { CounterAction, INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import { Counter } from './state';

// const initialState: Counter = {
//   value: 0
// }

export default function counter(state: Counter = 0, action: CounterAction) {
  switch (action.type) {
    case INCREMENT_COUNTER: 
      return state  + 1;
    case DECREMENT_COUNTER:
      return state  - 1;
    default: 
      return state;
  }
}