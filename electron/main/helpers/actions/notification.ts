import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const triggerAction = (actionUid: string) =>
  action(constants.NOTIFICATIONS_TRIGGER_ACTION, null, { uid: actionUid })
