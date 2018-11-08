import { ofType, Epic, combineEpics } from 'redux-observable';
import { concat, map, mergeMap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import * as clientActions from '../actions/client';
import * as constants from '../constants';
import { AppsManager } from '../AppsManager';

const openLinkEpic: Epic<any> = (action$, state$) => action$.pipe(
  ofType(constants.OPEN_DAPP_BY_HTTP_PROTOCOL),
  switchMap(async (action) => {
    const { dappName, params, dappOpened } = action.payload;
    const { activeDapp } = state$.value.client;
    const { grantedApps } = state$.value.permissionManager;
    const dappNameLowerCase = dappName.toLowerCase();
    const openedDapps = state$.value.tray.items

    const dappInTray = openedDapps.find((dapp: any) => dapp.appName.toLowerCase() === dappNameLowerCase)

    const appInGrantedApps = grantedApps && grantedApps.find((appName: string) => appName.toLowerCase() === dappNameLowerCase);

    // Check app opening
    const toggleAppSuccess = new Promise((resolve, reject) => {
      if (dappOpened) {
        resolve(action);
      } else {
        const subscriber = action$.subscribe((action) => {
          if (action.type === constants.TOGGLE_APP_HOME_SUCCESS && dappNameLowerCase === action.meta.name.toLowerCase()) {
            resolve(action);
            subscriber.unsubscribe();
          }
        });
      }
    });

    // Waiting for check dapp permissions
    const grantedPermissions = new Promise((resolve, reject) => {
      if (appInGrantedApps) {
        resolve();
      } else {
        const subscriber = action$.subscribe((action) => {
          if (action.type === constants.GRANT_PERMISSIONS && action.meta.name.toLowerCase() === dappNameLowerCase) {
            resolve(action);
            subscriber.unsubscribe();
          }
        });
      }
    });

    await Promise.all([toggleAppSuccess, grantedPermissions]);

    return { type: constants.DAPP_ACTION_OPEN_LINK, payload: { params } };
  })
);

const subscribeToggleApp: Epic<any> = (action$, state$) => action$.pipe(
  ofType(constants.HTTP_PROTOCOL_OPEN_LINK),
  switchMap(async (action) => {
    const [dappName, ...params] = action.payload.params;
    const { activeDapp } = state$.value.client;
    const actionsMap = [];
    const dappOpened = activeDapp && activeDapp.appName && activeDapp.appName.toLowerCase() === dappName.toLowerCase();

    const openDappByHttpProtocolAction = {
      type: constants.OPEN_DAPP_BY_HTTP_PROTOCOL,
      payload: { params, dappName, dappOpened }
    };

    actionsMap.push(openDappByHttpProtocolAction);

    const dapp = dappName ? AppsManager.dapps.find(dappObj => dappObj.appName.toLowerCase() === dappName.toLowerCase()) : null;

    if (!dappOpened) {
      actionsMap.push(clientActions.toggleAppHome(dapp.appName));
    }

    if (dapp) {
      return actionsMap;
    }

    return [{ type: constants.HTTP_PROTOCOL_OPEN_LINK_FAILURE }];
  }),
  mergeMap((actions) => actions)
);

export default combineEpics(
  subscribeToggleApp,
  openLinkEpic,
);
