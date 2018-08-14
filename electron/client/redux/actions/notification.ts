import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { TOGGLE_NOTIFICATION_PANEL } from '../constants';
 
export interface NotificationPanelAction extends Action {
  payload?: {
    isOpen?: boolean
  }
}

export const toggle = (openStatus: boolean): NotificationPanelAction => action(TOGGLE_NOTIFICATION_PANEL, { isOpen: openStatus });