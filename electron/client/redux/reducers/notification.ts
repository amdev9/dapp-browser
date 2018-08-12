import { IAction } from '../actions/helpers';
import { toggle } from '../actions/notification';

export type TState = boolean;

export default function notification(state: boolean = false, action: IAction) {
  if (toggle.test(action)) {
    return !state;
  } 
  return state;
}