import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { TOGGLE_SETTINGS_PANEL } from '../constants';

export interface SettingsPanelAction extends Action {
  payload?: {
    isOpen?: boolean
  }
}
export const toggle = (openStatus: boolean): SettingsPanelAction => action(TOGGLE_SETTINGS_PANEL, { isOpen: openStatus });
