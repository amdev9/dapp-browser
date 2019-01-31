import { AnyAction } from 'redux';
import * as uuid from 'uuid/v4';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

import * as constants from './constants';
import { showNotification } from './component';
import * as actions from './actions';

import {
  actions as clientActions,
  constants as clientConstants,
} from 'ClientApp/modules/Notification';

// import ClientManager from '../../helpers/systemComponents/ClientManager';
import { component as AppsManager } from '../../modules/AppsManager';
import StoreManager from '../../helpers/systemComponents/StoreManager';

const notificationEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.NOTIFICATIONS_SHOW_NOTIFY),
  map((action) => {
    showNotification(action.payload.options, {
      onClick: () => {
        StoreManager.store.dispatch(actions.triggerAction(action.payload.events.onClick));
        AppsManager.openDapp(action.meta.name);
      },
      onClose: () => {
        StoreManager.store.dispatch(actions.triggerAction(action.payload.events.onClose));
      }
    });
    return clientActions.addNotification({
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
  ofType(clientConstants.CLIENT_NOTIFICATION_TRIGGER_ACTION),
  map((action) => {
    AppsManager.openDapp(action.meta.appName);
    return actions.triggerAction(action.meta.uid);
  }),
);

export default combineEpics(
  notificationEpic,
  clientNotificationEpic,
);
