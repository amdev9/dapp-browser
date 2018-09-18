import { Action } from 'redux';
import { action } from "typesafe-actions";
import { TOGGLE_SEARCH_PANEL } from "../constants";

export interface SearchAction extends Action {
  payload: {
    isOpen: boolean
  }
}

export const toggle = (openStatus: boolean): SearchAction => action(TOGGLE_SEARCH_PANEL, { isOpen: openStatus });
