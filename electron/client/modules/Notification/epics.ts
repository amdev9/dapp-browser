import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, map, tap, mergeMap } from 'rxjs/operators';
import { ActionType } from 'typesafe-actions';

// import * as mainConstants from 'MainApp/modules/AppsManager/constants';
import * as models from './models';
import * as actions from './actions';
import * as constants from './constants';
import StoreManager from '../StoreManager/component';

export type IpfsStorageActions = ActionType<typeof actions>;

const setUnreadCounterEpic: Epic<AnyAction> = (action$, state$) => action$.pipe(
  ofType(constants.CLIENT_ADD_NOTIFICATION),
  map((action) => {
    const isOpenNotificationPanel = state$.value.isOpen.notification;
    const { item } = action.payload;

    if (isOpenNotificationPanel) {
      item.shown = true;
    }

    return actions.addNotificationWithStatus(item);
  }),
);

const resetUnreadCounterEpic: Epic<AnyAction> = (action$, state$) => action$.pipe(
  ofType(constants.TOGGLE_NOTIFICATION_PANEL),
  tap((action) => {
    if (state$.value.isOpen.notification) {
      StoreManager.store.dispatch(actions.setAllNotificationsAsRead());
    }
  }),
  ignoreElements(),
);

export default combineEpics(
  setUnreadCounterEpic,
  resetUnreadCounterEpic,
);
