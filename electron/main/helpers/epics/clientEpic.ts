import { ofType, Epic, combineEpics } from 'redux-observable';
import { ignoreElements, tap, mapTo, map } from 'rxjs/operators';
import * as constants from '../constants';
import { component as AppsManager, models as AppsManagerModels } from '../../modules/AppsManager';
import ClientManager from '../systemComponents/ClientManager';
import * as clientActions from '../actions/client';

const openDappEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.CLIENT_SWITCH_DAPP),
  tap(action => ClientManager.switchDapp(action.payload.targetDappName)),
  ignoreElements(),
);

const addAppItemEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.SWITCH_DAPP_SUCCESS),
  map(action => clientActions.addAppItem(AppsManager.getAppItem(action.payload.targetDappName))),
);

const clientToggleHomeEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.CLIENT_TOGGLE_HOME),
  map((action) => {
    ClientManager.toggleHome();
    return clientActions.toggleHome(action.payload.isHome);
  }),
);

const toggleSettingsEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.TOGGLE_SETTINGS_PANEL),
  tap((action: any) => ClientManager.toggleHome()),
  ignoreElements(),
);

const removeTrayItemEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.REMOVE_TRAY_ITEM),
  map((action) => {
    ClientManager.toggleHome(); // call setBrowserView(null) before destoying the BrowserView
    AppsManager.closeDapp(action.payload.targetDappName);
    return clientActions.clientToggleHome(true);
  }),
);

export default combineEpics(
  openDappEpic,
  addAppItemEpic,
  toggleSettingsEpic,
  removeTrayItemEpic,
  clientToggleHomeEpic,
);
