import { action } from 'typesafe-actions';
import { TOGGLE_SEARCH_PANEL } from '../constants';

export const toggle = (openStatus: boolean) => action(TOGGLE_SEARCH_PANEL, { isOpen: openStatus });
