import 'rxjs';
import { combineEpics, ofType, Epic } from 'redux-observable';
import { mapTo, map } from 'rxjs/operators';

import * as actions from '../actions/channel';
import * as constants from '../constants';

const openChannelSuccess = () => ({ type: constants.OPEN_CHANNEL_SUCCESS });

const startCountdownEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.OPEN_CHANNEL),
  mapTo(openChannelSuccess()),
);

const fileManagerOpenSuccess: Epic<any> = action$ => action$.pipe(
  ofType(constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS),
  map(({ payload }) => actions.uploadIpfsFile(payload.entry.id)),
);

const toggleHome: Epic<any> = action$ => action$.pipe(
  ofType(constants.TOGGLE_HOME),
  mapTo(actions.networkUnsubscribe()),
);

export const rootEpic = combineEpics(
  fileManagerOpenSuccess,
  startCountdownEpic,
  toggleHome,
);
