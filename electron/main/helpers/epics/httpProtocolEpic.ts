import { ofType, Epic, combineEpics } from 'redux-observable';
import { concat, ignoreElements, map, mergeMap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { createSelector } from 'reselect';

import * as clientActions from '../actions/client';
import * as constants from '../constants';
import { AppsManager } from '../AppsManager';
import ClientManager from '../ClientManager';
import { IState } from '../reducers/state';
import { PROTOCOL } from "../constants/globalVariables";
import { actionPromise } from "../utils/actionUtils";
import * as httpProtocolActions from "../actions/httpProtocol";

const activeDappSelector = createSelector(
  (state: IState) => state.client.activeDapp,
  activeDapp => activeDapp && activeDapp.appName && activeDapp.appName.toLowerCase(),
);

const httpProtocolOpenLink: Epic<any> = (action$, state$) => action$.pipe(
  ofType(constants.HTTP_PROTOCOL_OPEN_LINK),
  switchMap(async (action) => {
    const state = state$.value;
    const { link } = action.payload;
    const clearLink = link && link.replace(PROTOCOL, '');
    const [dappName, ...params] = clearLink.split('/').filter((item: string) => item);
    const requestDapp = AppsManager.getDappItem(dappName);

    if (!requestDapp) {
      throw Error('Dapp does not exist');
    }

    const activeDapp = activeDappSelector(state);
    const requestDappName = requestDapp.appName;
    const isDappOpen = activeDapp === requestDappName;

    if (!isDappOpen || !AppsManager.isDappReady(requestDappName)) {
      ClientManager.store.dispatch(clientActions.switchDapp(requestDappName));

      await actionPromise({
        successType: constants.SWITCH_DAPP_SUCCESS,
        failureType: constants.SWITCH_DAPP_FAILURE,
      }, (action) => action.payload.targetDappName === requestDappName);
    }

    const createdDapp = AppsManager.getDappRenderer(requestDappName);

    if (createdDapp) {
      ClientManager.store.dispatch(httpProtocolActions.dappActionOpenLink(params, createdDapp.id));
    }
  }),
  ignoreElements()
);

export default combineEpics(
  httpProtocolOpenLink
  // subscribeToggleApp,
  // openLinkEpic,
);
