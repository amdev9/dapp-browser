import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { TOGGLE_LOADER_PANEL } from '../constants';

export interface LoaderPanelAction extends Action {
  payload?: {
    isOpen?: boolean
  }
}
export const toggle = (openStatus: boolean): LoaderPanelAction => action(TOGGLE_LOADER_PANEL, { isOpen: openStatus })
