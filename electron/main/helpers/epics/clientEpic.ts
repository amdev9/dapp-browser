import { ofType, Epic, combineEpics } from 'redux-observable';
import { ignoreElements, tap, mapTo, map } from 'rxjs/operators';
import * as constants from '../constants';
import { component as AppsManager } from '../../modules/AppsManager';
import * as clientActions from '../actions/client';

const addAppItemEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.SWITCH_DAPP_SUCCESS),
  map(action => clientActions.addAppItem(AppsManager.getAppItem(action.payload.targetDappName))),
);

const clientToggleHomeEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.CLIENT_TOGGLE_HOME),
  map((action) => {
    AppsManager.toggleHome();
    return clientActions.toggleHome(action.payload.isHome);
  }),
);

const toggleSettingsEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.TOGGLE_SETTINGS_PANEL),
  tap((action: any) => AppsManager.toggleHome()),
  ignoreElements(),
);

export default combineEpics(
  addAppItemEpic,
  toggleSettingsEpic,
  clientToggleHomeEpic,
);
