import * as constants from './constants';
import { ActionType } from 'typesafe-actions';
import * as notificationActions from './actions';
import { NotificationPanel } from './models';

export type NotificationPanelAction = ActionType<typeof notificationActions>;

export default function notification(state: NotificationPanel = null, action: NotificationPanelAction) {
  switch (action.type) {
    case constants.CLIENT_CLEAR_NOTIFICATION:
      const items = state.items.filter(item => item.id !== action.payload.id);
      return { ...state, items };

    case constants.CLIENT_CLEAR_ALL_NOTIFICATIONS:
      return { ...state, items: [] };

    case constants.CLIENT_ADD_NOTIFICATION:
      return { ...state, items: [...state.items, action.payload.item] };

    default:
      return state;
  }
}
