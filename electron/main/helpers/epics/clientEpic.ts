import { ofType, Epic, combineEpics } from 'redux-observable';
import { ignoreElements, tap, mapTo, map } from 'rxjs/operators';
import * as constants from '../constants';
import { AppsManager } from '../systemComponents/AppsManager';
import ClientManager from '../systemComponents/ClientManager';
import * as clientActions from '../actions/client';

const openDappEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.SWITCH_DAPP),
  tap(action => ClientManager.switchDapp(action.payload.targetDappName)),
  ignoreElements(),
);

const addAppItemEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.SWITCH_DAPP_SUCCESS),
  map(action => clientActions.addAppItem(AppsManager.getAppItem(action.payload.targetDappName))),
);

const toggleHomeEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.TOGGLE_HOME),
  tap((action: any) => ClientManager.toggleHome()),
  ignoreElements(),
);

const toggleSettingsEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.TOGGLE_SETTINGS_PANEL),
  tap((action: any) => ClientManager.toggleHome()),
  ignoreElements(),
);

const removeTrayItemEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.REMOVE_TRAY_ITEM),
  mapTo(clientActions.toggleHome(true)),
);

const setTrayCounterEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.DAPP_SET_TRAY_COUNTER),
  map(action => clientActions.setTrayCounter(action.meta.name, action.payload.counter)),
);

export default combineEpics(
  openDappEpic,
  addAppItemEpic,
  toggleHomeEpic,
  toggleSettingsEpic,
  removeTrayItemEpic,
  setTrayCounterEpic,
);
