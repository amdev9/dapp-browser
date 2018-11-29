import { action } from 'typesafe-actions';
import * as constants from '../constants';
import { NotifyItem } from '../model/notification';

export const toggle = () => action(constants.TOGGLE_NOTIFICATION_PANEL);
export const clearNotification = (id: number) => action(constants.CLIENT_CLEAR_NOTIFICATION, {id});
export const clearAllNotifications = () => action(constants.CLIENT_CLEAR_ALL_NOTIFICATIONS);
export const addNotification = (item: NotifyItem) => action(constants.CLIENT_ADD_NOTIFICATION, { item });

export const triggerAction = (actionUid: string) =>
  action(constants.NOTIFICATIONS_TRIGGER_ACTION, null, { uid: actionUid })
