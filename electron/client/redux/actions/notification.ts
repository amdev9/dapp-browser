import { action } from 'typesafe-actions';
import { Action } from 'redux';
import {CLEAR_NOTIFICATION_GROUP, TOGGLE_NOTIFICATION_PANEL} from '../constants';
 
export interface NotificationPanelAction extends Action {
  payload?: {
    isOpen?: boolean
    groupId?: number, // seems like it's better to extract this into a separate action, but we have only one reducer "notification", which takes NotificationPanelAction interface
  }
}

export const toggle = (openStatus: boolean): NotificationPanelAction => action(TOGGLE_NOTIFICATION_PANEL, { isOpen: openStatus });
export const clearNotificationGroup = (groupId: number): NotificationPanelAction => action(CLEAR_NOTIFICATION_GROUP, {groupId});
