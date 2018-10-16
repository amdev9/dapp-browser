import { action } from 'typesafe-actions';
 
import { TOGGLE_STATUS_BAR_PANEL, TOGGLE_PEERS_BAR_PANEL, LOGGER_WRITE } from '../constants';

 
export const toggle = () => action(TOGGLE_STATUS_BAR_PANEL);
export const togglePeers = () => action(TOGGLE_PEERS_BAR_PANEL);
export const writeToConsole = () => action(LOGGER_WRITE);
