import { of } from 'rxjs';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { merge, concatMap, ignoreElements, tap, switchMap } from 'rxjs/operators';
import * as constants from '../constants';
import { AppsManager } from '../AppsManager';
import ClientManager from '../ClientManager';
import * as clientActions from '../actions/client';

const openDappEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.SWITCH_DAPP),
  switchMap(async (action) => {
    try {
      await ClientManager.isClientWindowLoaded;
      await AppsManager.openDapp(action.payload.targetDappName, ClientManager.clientWindow, ClientManager.store.getState());
      ClientManager.store.dispatch(clientActions.switchDappSuccess(action.payload.targetDappName));
      ClientManager.store.dispatch(clientActions.addAppItem(AppsManager.getAppItem(action.payload.targetDappName)));
    } catch (error) {
      ClientManager.store.dispatch(clientActions.switchDappFailure(action.payload.targetDappName, error));
    }
  }),
  ignoreElements(),
);

const toggleHomeEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.TOGGLE_HOME),
  tap((action: any) => ClientManager.clientWindow.setBrowserView(null)),
  ignoreElements(),
);

export default combineEpics(
  openDappEpic,
  toggleHomeEpic,
);
