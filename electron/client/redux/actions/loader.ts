import { action } from 'typesafe-actions';
import { TOGGLE_LOADER_PANEL } from '../constants';

export const toggle = () => action(TOGGLE_LOADER_PANEL);
