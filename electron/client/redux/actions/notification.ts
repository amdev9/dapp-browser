import { action } from 'typesafe-actions';
import * as constants from '../constants';
 
export const toggle = (openStatus: boolean) => action(constants.TOGGLE_NOTIFICATION_PANEL, { isOpen: openStatus });
export const clearNotification = (id: number) => action(constants.CLEAR_NOTIFICATION, {id});
export const clearAllNotifications = () => action(constants.CLEAR_ALL_NOTIFICATIONS);
