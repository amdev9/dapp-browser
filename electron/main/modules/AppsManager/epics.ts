import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, tap, mergeMap } from 'rxjs/operators';

import * as constants from './constants';
import * as actions from './actions';
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

const getAllDappsEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.GET_ALL_DAPPS),
  mergeMap(async (action) => {
    try {
      const dappsList = await AppsManager.getAllDapps();
      return actions.getAllDappsSuccess(dappsList, action.meta.uid);
    } catch (e) {
      return actions.getAllDappsFailure(e, action.meta.uid);
    }
  }),
);

export default combineEpics(
  dappContentLoadedEpic,
  installDappEpic,
  getAllDappsEpic,
);
