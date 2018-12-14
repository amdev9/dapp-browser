import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';

import * as constants from './constants';
import AppsManager from './component';

const dappContentLoadedEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.DAPP_CONTENT_LOADED),
  tap((action) => {
    AppsManager.addReadyDapp(action.meta.sourceUUID, action.meta.name);
  }),
  ignoreElements(),
);

const installDappEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.ON_DAPP_INSTALL),
  tap((action) => {
    AppsManager.installDapp(action.payload.dappName, action.payload.hash);
  }),
  ignoreElements(),
);

export default combineEpics(
  dappContentLoadedEpic,
  installDappEpic,
);
