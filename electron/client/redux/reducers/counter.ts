import { CounterAction } from '../actions/counter';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants';
import { Counter } from './state';

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