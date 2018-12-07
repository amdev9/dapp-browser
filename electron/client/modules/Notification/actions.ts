import { action } from 'typesafe-actions';
import * as constants from './constants';
import { NotifyItem } from './models';

export const toggle = () => action(constants.TOGGLE_NOTIFICATION_PANEL);
export const clearNotification = (id: string) => action(constants.CLIENT_CLEAR_NOTIFICATION, {id});
export const clearAllNotifications = () => action(constants.CLIENT_CLEAR_ALL_NOTIFICATIONS);
export const addNotification = (item: NotifyItem) => action(constants.CLIENT_ADD_NOTIFICATION, { item });

export const triggerAction = (actionUid: string, appName: string) =>
  action(constants.CLIENT_NOTIFICATION_TRIGGER_ACTION, null, { appName, uid: actionUid })
