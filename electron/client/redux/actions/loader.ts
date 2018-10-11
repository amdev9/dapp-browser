import { action } from 'typesafe-actions';
import { TOGGLE_LOADER_PANEL } from '../constants';

export const toggle = (openStatus: boolean) => action(TOGGLE_LOADER_PANEL, { isOpen: openStatus })
