import { AnyAction } from 'redux';
import * as uuid from 'uuid/v4';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, map } from 'rxjs/operators';

import * as constants from '../constants';
import * as clientActions from '../actions/client';

import { showNotification } from '../systemComponents/Notification';

const notificationEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.NOTIFICATIONS_SHOW_NOTIFY),
  map((action) => {
    showNotification(action.payload.options, action.payload.events, action.meta.name);
    console.log('notifyyyyy', action)
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

export default combineEpics(
  notificationEpic,
);
