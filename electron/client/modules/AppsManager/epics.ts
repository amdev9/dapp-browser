import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, map, mergeMap } from 'rxjs/operators';

import * as mainConstants from 'MainApp/modules/AppsManager/constants';

const updateInstalledDapps: Epic<AnyAction> = action$ => action$.pipe(
  ofType(mainConstants.UPDATE_INSTALLED_DAPPS),
  ignoreElements(),
);

export default combineEpics(
  updateInstalledDapps,
);
