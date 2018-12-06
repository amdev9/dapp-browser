import { ofType, Epic, combineEpics } from 'redux-observable';
import { ignoreElements, switchMap } from 'rxjs/operators';

import * as constants from './constants';
import * as httpProtocolActions from './actions';

import { AppsManager } from '../../helpers/systemComponents/AppsManager';
import ClientManager from '../../helpers/systemComponents/ClientManager';
import { activeDappSelector } from '../../helpers/selectors';
import StoreManager from '../../helpers/systemComponents/StoreManager';

const httpProtocolOpenLink: Epic<any> = (action$, state$) => action$.pipe(
  ofType(constants.HTTP_PROTOCOL_OPEN_LINK),
  switchMap(async (action) => {
    try {
      const state = state$.value;
      const { link } = action.payload;
      const clearLink = link && link.replace(constants.HTTP_PROTOCOL, '');
      const [dappName, ...params] = clearLink.split('/').filter((item: string) => item);
      const requestDapp = AppsManager.getDappItem(dappName);

      if (!requestDapp) {
        throw Error('Dapp does not exist');
      }

      const activeDapp = activeDappSelector(state);
      const requestDappName = requestDapp.appName;
      const isDappOpen = activeDapp === requestDappName;

      if (!isDappOpen || !AppsManager.isDappReady(requestDappName)) {
        await ClientManager.switchDapp(requestDappName);
      }

      const createdDapp = AppsManager.getDappRenderer(requestDappName);

      if (createdDapp) {
        StoreManager.store.dispatch(httpProtocolActions.dappActionOpenLink(params, createdDapp.id));
      }

      return httpProtocolActions.httpProtocolOpenLinkSuccess(link);
    } catch (error) {
      return httpProtocolActions.httpProtocolOpenLinkFailure(action.payload.link, error);
    }
  }),
  ignoreElements(),
);

export default combineEpics(
  httpProtocolOpenLink,
);
