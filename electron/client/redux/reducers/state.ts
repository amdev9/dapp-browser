import { TState as TCounterState } from './counter';
import { TState as TNotificationState } from './notification';
import { IState as TTrayState } from '../model';

export interface IState {
  counter: TCounterState;
  notification: TNotificationState;
  tray: TTrayState
}