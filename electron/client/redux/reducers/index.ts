import { combineReducers } from 'redux';
 
import counter, { TState as TCounterState } from './counter';

const rootReducer = combineReducers({
  counter
});

export interface IState {
  counter: TCounterState;
}

export default rootReducer;