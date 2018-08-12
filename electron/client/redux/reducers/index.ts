import { combineReducers } from 'redux';
 
import counter, { TState as TCounterState } from './counter';
import notification, { TState as TNotificationState } from './notification';

const rootReducer = combineReducers({
  counter,
  notification
});

export interface IState {
  counter: TCounterState;
  notification: TNotificationState;
}

export default rootReducer;