import { action } from 'typesafe-actions';
import * as constants from '../constants';
import { NotificationOptions, NotificationEvents } from '../../classes/Notification';

type NotificationEventUids = { [event: string]: string };

export const showNotification = (options: NotificationOptions, events: NotificationEventUids) =>
  action(constants.NOTIFICATIONS_SHOW_NOTIFY, { options, events });
