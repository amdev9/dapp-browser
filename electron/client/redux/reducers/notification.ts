import { TOGGLE_NOTIFICATION_PANEL, NotificationPanelAction } from '../actions/notification';
import { NotificationPanel } from './state';

const initialState: NotificationPanel = {
  items: [],
  isOpen: false,
}

export default function notification(state: NotificationPanel = initialState, action: NotificationPanelAction) {
  switch (action.type) {
    case TOGGLE_NOTIFICATION_PANEL:
      if (action.payload && action.payload.hasOwnProperty('isOpen')) {
        return { ...state, isOpen: action.payload.isOpen };
      } else {
        return { ...state, isOpen: !state.isOpen };
      }
  
    default: 
      return state;
  }
}