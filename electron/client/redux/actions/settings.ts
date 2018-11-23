import { action } from 'typesafe-actions';
import { TOGGLE_SETTINGS_PANEL } from '../constants';

export const toggle = () => action(TOGGLE_SETTINGS_PANEL);
