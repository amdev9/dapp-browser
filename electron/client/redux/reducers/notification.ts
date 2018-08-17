import {CLEAR_ALL_NOTIFICATIONS, CLEAR_NOTIFICATION, TOGGLE_NOTIFICATION_PANEL} from '../constants';
import { NotificationPanelAction } from '../actions/notification';
import { NotificationPanel } from './state';

const chatIcon = require("../../assets/app-icons/chat.svg");
const contactIcon = require("../../assets/app-icons/contact.svg");

const initialState: NotificationPanel = {
  items: [{
    id: 1,
    message: '13245lorem ipsum delorem new as lorem ipsum, we go to hell',
    created: new Date(),
    icon: chatIcon,
    appName: 'Chat'
  },
  {
    id: 2,
    message: '434343434lorem ipsum delorem new as lorem ipsum, we go to hell',
    created: new Date(),
    icon: contactIcon,
    appName: 'Chat'
  }
  ],
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
    case CLEAR_NOTIFICATION:
      const items = state.items.filter(item => item.id !== action.payload.id);
      return {...state, items};

    case CLEAR_ALL_NOTIFICATIONS:
      return {...state, items: []};

    default: 
      return state;
  }
}
