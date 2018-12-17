import { Notification, app } from 'electron';

import * as actions from './actions';
import ClientManager from '../../helpers/systemComponents/ClientManager';
import StoreManager from '../../helpers/systemComponents/StoreManager';

interface NotificationOptions {
  title: string;
  body: string;
}

interface NotificationEventsUids {
  onClick?: () => void;
  onClose?: () => void;
}

export const showNotification = (options: NotificationOptions, events: NotificationEventsUids) => {
  const notification = new Notification(options);

  if (events.onClick) {
    notification.on('click', () => {
      events.onClick();
    });
  }

  if (events.onClose) {
    notification.on('close', () => {
      events.onClose();
    });
  }

  notification.show();

};
