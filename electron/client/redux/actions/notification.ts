import { action } from 'typesafe-actions';
 
export const toggle = (openStatus: boolean) => action('TOGGLE_NOTIFICATION_PANEL', { isOpen: openStatus });