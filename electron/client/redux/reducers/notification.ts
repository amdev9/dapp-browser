import * as constants from '../constants';
import { ActionType } from 'typesafe-actions';
import * as notificationActions from '../actions/notification';
import { NotificationPanel } from './state';

export type NotificationPanelAction = ActionType<typeof notificationActions>;


const chatIcon = require("../../assets/app-icons/chat.svg");
const contactIcon = require("../../assets/app-icons/contact.svg");

const initialState: NotificationPanel = {
  items: [{
    id: 1,
    message: 'Ipsum delorem new as lorem ipsum, we go to hell',
    created: new Date(),
    icon: chatIcon,
    appName: 'Chat'
  },
  {
    id: 2,
    message: 'Delorem new as lorem ipsum, we go to hell',
    created: new Date(),
    icon: contactIcon,
    appName: 'Chat'
  }
  ],
  isOpen: false,
}

export default function notification(state: NotificationPanel = initialState, action: NotificationPanelAction) {
  switch (action.type) {
    case constants.TOGGLE_NOTIFICATION_PANEL:
      if (action.payload && action.payload.hasOwnProperty('isOpen')) {
        return { ...state, isOpen: action.payload.isOpen };
      } else {
        return { ...state, isOpen: !state.isOpen };
      }
    case constants.CLEAR_NOTIFICATION:
      const items = state.items.filter(item => item.id !== action.payload.id);
      return { ...state, items };

    case constants.CLEAR_ALL_NOTIFICATIONS:
      return { ...state, items: [] };

    default:
      return state;
  }
}
