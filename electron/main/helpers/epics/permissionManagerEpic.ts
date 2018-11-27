import { ofType, Epic, combineEpics } from 'redux-observable';
import { merge, concatMap, ignoreElements, tap, switchMap } from 'rxjs/operators';
import * as constants from '../constants';
import PermissionManager from '../systemComponents/PermissionManager';

const closePermissionWindowEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.CLOSE_MANAGER),
  tap((action: any) => {
    PermissionManager.closePermissionWindow();
  }),
  ignoreElements(),
);

export default combineEpics(
  closePermissionWindowEpic,
);
