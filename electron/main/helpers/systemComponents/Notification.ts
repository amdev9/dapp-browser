import { Notification } from 'electron';

import ClientManager from './ClientManager';
import * as actions from '../actions/notification';

interface NotificationOptions {
  title: string;
  body: string;
}

interface NotificationEventsUids {
  onClick: string;
  onClose: string;
}

export const showNotification = (options: NotificationOptions, events: NotificationEventsUids) => {
  const notification = new Notification(options);

  if (events.onClick) {
    notification.on('click', () => {
      ClientManager.store.dispatch(actions.triggerAction(events.onClick));
    });
  }

  if (events.onClose) {
    notification.on('close', () => {
      ClientManager.store.dispatch(actions.triggerAction(events.onClose));
    });
  }

  notification.show();

};
