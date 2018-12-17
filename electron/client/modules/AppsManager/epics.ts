import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';

import * as mainConstants from 'MainApp/modules/AppsManager/constants';
import AppsManager from './component';

const dappDownloadSuccessEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(mainConstants.DAPP_DOWNLOAD_SUCCESS),
  tap((action) => {
  }),
  ignoreElements(),
);

const dappDownloadFailureEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(mainConstants.DAPP_DOWNLOAD_FAILURE),
  tap((action) => {
  }),
  ignoreElements(),
);

export default combineEpics(
  dappDownloadSuccessEpic,
  dappDownloadFailureEpic,
);
