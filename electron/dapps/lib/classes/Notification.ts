import * as uuid from 'uuid/v4';

import * as actions from '../redux/actions/notification';

import StoreUIDSubscriber from './StoreUIDSubscriber';

export interface NotificationOptions {
  title: string;
  body: string;
}

export interface NotificationEvents {
  onClick: () => void;
  onClose: () => void;
}

class Notification extends StoreUIDSubscriber {
  showNotification(options: NotificationOptions, events: NotificationEvents) {

    const _EVENTS: NotificationEvents = { ...events };

    const _EVENTS_UID_MATCH: { [event: string]: string } = {};

    const unsubscriberArray = Object.keys(_EVENTS).map((event: keyof NotificationEvents) => {
      const callbackUid = uuid();
      _EVENTS_UID_MATCH[event] = callbackUid;
      return this.onUIDEvent(callbackUid, () => {
        console.log('NOTIFICATION:', event);
        _EVENTS[event]();

        // Unsubscribe events after triggered any event
        unsubscriberArray.forEach(callback => callback());
      });
    });

    this.store.dispatch(actions.showNotification(options, _EVENTS_UID_MATCH));
  };
}

export default new Notification();
