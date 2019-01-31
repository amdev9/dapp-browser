import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const toggle = () => action(constants.TOGGLE_LOADER_PANEL);

export const setLoaderTab = (tab: string) => action(constants.SET_LOADER_TAB, { tab }, { scope: 'local' });
