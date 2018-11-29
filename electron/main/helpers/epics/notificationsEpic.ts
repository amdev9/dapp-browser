import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, map } from 'rxjs/operators';

import * as constants from '../constants';
import { showNotification } from '../systemComponents/Notification';

const notificationEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.NOTIFICATIONS_SHOW_NOTIFY),
  map((action) => {
    showNotification(action.payload.options, action.payload.events);
  }),
  ignoreElements(),
);

export default combineEpics(
  notificationEpic,
);
