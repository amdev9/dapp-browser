import { ActionType } from 'typesafe-actions';

import * as constants from './constants';
import * as notificationActions from './actions';
import { NotificationPanel, NotifyItem } from './models';

export type NotificationPanelAction = ActionType<typeof notificationActions>;

const initialState = {
  items: [] as NotifyItem[],
  unreadCounter: 0,
};

export default function notification(state: NotificationPanel = initialState, action: NotificationPanelAction) {
  switch (action.type) {
    case constants.CLIENT_CLEAR_NOTIFICATION:
      const items = state.items.filter(item => item.id !== action.payload.id);
      return { ...state, items };

    case constants.CLIENT_CLEAR_ALL_NOTIFICATIONS:
      return { ...state, items: [] };

    case constants.CLIENT_ADD_NOTIFICATION_WITH_STATUS:
      return { ...state, items: [action.payload.item, ...state.items] };

    case constants.CLIENT_NOTIFICATION_SET_NOTIFICATION_AS_READ:
      return {
        ...state,
        items: state.items.map((notify) => {
          if (action.payload.ids.find(id => id === notify.id)) {
            return {
              ...notify,
              shown: true,
            };
          }
          return notify;
        })
      };

    case constants.CLIENT_NOTIFICATION_SET_ALL_NOTIFICATIONS_AS_READ:
      return {
        ...state,
        items: state.items.map((notify) => {
          return {
            ...notify,
            shown: true,
          };
        })
      };

    default:
      return state;
  }
}
