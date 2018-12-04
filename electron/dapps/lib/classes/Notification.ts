import * as uuid from 'uuid/v4';

import * as actions from '../redux/actions/notification';

import StoreSubscriber from './internal/StoreSubscriber';

export interface NotificationOptions {
  title: string;
  body: string;
}

export interface NotificationEvents {
  onClick: () => void;
  onClose: () => void;
}

class Notification extends StoreSubscriber {
  showNotification(options: NotificationOptions, events: NotificationEvents) {

    const _EVENTS: NotificationEvents = { ...events };

    const _EVENTS_UID_MATCH: { [event: string]: string } = {};

    const unsubscriberArray = Object.keys(_EVENTS).map((event: keyof NotificationEvents) => {
      const callbackUid = `${event}]_${uuid()}`;
      _EVENTS_UID_MATCH[event] = callbackUid;
      return this.onUIDEvent(callbackUid, () => {
        console.log('NOTIFICATION:', event);
        _EVENTS[event]();
      });
    });

    this.store.dispatch(actions.showNotification(options, _EVENTS_UID_MATCH));

    // Unsubscribe events after triggered any event
    return () => unsubscriberArray.forEach(callback => callback());
  };
}

export default new Notification();
