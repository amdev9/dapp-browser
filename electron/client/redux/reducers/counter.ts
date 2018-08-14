import { Action } from 'redux';
 
export type TState = number;

export default function counter(state: number = 0, action: Action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER': 
      return state + 1;
    case 'DECREMENT_COUNTER':
      return state - 1;
    default: 
      return state;
  }
}