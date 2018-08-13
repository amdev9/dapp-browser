import { IAction } from '../actions/helpers';
// import { toggle } from '../actions/notification';

export type TState = boolean;

export default function notification(state: boolean = false, action: IAction) {
  switch (action.type) {
    case 'TOGGLE_NOTIFICATION_PANEL': 
      return !state;
    default: 
      return state;
  }
}