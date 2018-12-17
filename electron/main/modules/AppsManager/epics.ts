import { AnyAction } from 'redux';
import { of, concat } from 'rxjs';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, tap, map, mergeMap } from 'rxjs/operators';

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
  mergeMap(async (action: AnyAction) => {
    try {
      await AppsManager.installDapp(action.payload.dappName, action.payload.hash);
      return actions.onDappInstallSuccess(action.meta.uid)
    } catch (e) {
      return actions.onDappInstallFailure(e, action.meta.uid);
    }
  }),
);

const updateDappsListEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.ON_DAPP_INSTALL_SUCCESS),
  map( (action) => {
    const updatedDappsList = AppsManager.installedDapps;

    return actions.updateinstalledDapps(updatedDappsList)
  })
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
  updateDappsListEpic,
  getAllDappsEpic,
);
