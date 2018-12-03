import { AnyAction } from 'redux';
import * as uuid from 'uuid/v4';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, map } from 'rxjs/operators';

import * as constants from '../constants';
import * as clientActions from '../actions/client';

import { showNotification } from '../systemComponents/Notification';
import * as actions from '../actions/notification';
import ClientManager from '../systemComponents/ClientManager';

const notificationEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.NOTIFICATIONS_SHOW_NOTIFY),
  map((action) => {
    showNotification(action.payload.options, action.payload.events, action.meta.name);
    return clientActions.clientAddNotification({
      id: uuid(),
      message: action.payload.options.body,
      appName: action.meta.name,
      icon: null,
      created: new Date(),
      onClick: action.payload.events.onClick,
    });
  }),
);

const clientNotificationEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.CLIENT_NOTIFICATION_TRIGGER_ACTION),
  map((action) => {
    ClientManager.switchDapp(action.meta.appName);
    return actions.triggerAction(action.meta.uid);
  }),
);

export default combineEpics(
  notificationEpic,
  clientNotificationEpic,
);
