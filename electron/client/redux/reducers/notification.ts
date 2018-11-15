import * as constants from '../constants';
import { ActionType } from 'typesafe-actions';
import * as notificationActions from '../actions/notification';
import { NotificationPanel } from './state';

export type NotificationPanelAction = ActionType<typeof notificationActions>;

export default function notification(state: NotificationPanel = null, action: NotificationPanelAction) {
  switch (action.type) {
    case constants.CLEAR_NOTIFICATION:
      const items = state.items.filter(item => item.id !== action.payload.id);
      return { ...state, items };

    case constants.CLEAR_ALL_NOTIFICATIONS:
      return { ...state, items: [] };

    default:
      return state;
  }
}
