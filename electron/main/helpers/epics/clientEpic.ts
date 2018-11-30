import { ofType, Epic, combineEpics } from 'redux-observable';
import { ignoreElements, tap, mapTo, map } from 'rxjs/operators';
import * as constants from '../constants';
import { AppsManager } from '../systemComponents/AppsManager';
import ClientManager from '../systemComponents/ClientManager';
import * as clientActions from '../actions/client';
import { AppItem } from '../../../client/redux/model';

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

const setMainTrayCounterEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.DAPP_SET_TRAY_COUNTER),
  tap((action) => console.log('DAPP_SET_TRAY_COUNTER', action)),
  map(action => clientActions.setMainTrayCounter(action.meta.name, action.payload.counter)),
);

const setClientTrayCounterEpic: Epic<any> = (action$, state$) => action$.pipe(
  ofType(constants.SET_MAIN_TRAY_COUNTER),
  tap((action) => console.log('SET_MAIN_TRAY_COUNTER', action, state$.value.tray.items)),
  map((action) => {
    const dappsCounterList: clientActions.DappsCounter[] = [];
    let allDappsCounter = 0;

    const dappsList = state$.value.tray.items.forEach((trayItem: AppItem) => {
      const counter = trayItem.counter || 0;
      allDappsCounter += counter;

      dappsCounterList.push({
        counter,
        dappName: trayItem.appName,
      });
    });

    const badge = allDappsCounter ? allDappsCounter.toString() : '';

    ClientManager.setBadge(badge);
    return clientActions.setTrayCounters(dappsCounterList);
  }),
  // map(action => clientActions.setTrayCounter(action.meta.name, action.payload.counter)),
);

export default combineEpics(
  openDappEpic,
  addAppItemEpic,
  toggleHomeEpic,
  toggleSettingsEpic,
  removeTrayItemEpic,
  setMainTrayCounterEpic,
  setClientTrayCounterEpic,
);
