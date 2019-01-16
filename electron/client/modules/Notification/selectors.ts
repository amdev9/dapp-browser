import { createSelector } from 'reselect';
import { IState } from '../../redux/reducers/state';

export const getUnshownNotificationsCounter = createSelector(
  (state: IState) => state.notification.items,
  (notifications) => {
    const unshown = notifications.filter(notification => !notification.shown);

    return unshown.length;
  },
);
