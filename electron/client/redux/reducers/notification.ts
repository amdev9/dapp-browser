import { Action } from 'redux';
 
export type TState = boolean;

export default function notification(state: boolean = false, action: Action) {
  switch (action.type) {
    case 'TOGGLE_NOTIFICATION_PANEL': 
      return !state;
    default: 
      return state;
  }
}