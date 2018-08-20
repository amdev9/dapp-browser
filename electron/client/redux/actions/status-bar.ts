import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { TOGGLE_STATUS_BAR_PANEL } from '../constants';

export interface StatusBarPanelAction extends Action {
  payload?: {
    //isOpen?: boolean
  }
}

export const toggle = (): StatusBarPanelAction => action(TOGGLE_STATUS_BAR_PANEL);
