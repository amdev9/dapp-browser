import { action } from 'typesafe-actions';
import { Action } from 'redux';

export const TOGGLE_NOTIFICATION_PANEL = 'TOGGLE_NOTIFICATION_PANEL';
export interface NotificationPanelAction extends Action {
  payload?: {
    isOpen?: boolean
  }
}

export const toggle = (openStatus: boolean) => action(TOGGLE_NOTIFICATION_PANEL, { isOpen: openStatus });