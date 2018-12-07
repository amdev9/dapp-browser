import { ofType, Epic, combineEpics } from 'redux-observable';
import { ignoreElements, mergeMap } from 'rxjs/operators';

import * as constants from './constants';
import * as httpProtocolActions from './actions';

import { component as AppsManager } from '../../modules/AppsManager';
import { component as Dapp } from '../Dapp';

import ClientManager from '../../helpers/systemComponents/ClientManager';

const httpProtocolOpenLink: Epic<any> = (action$, state$) => action$.pipe(
  ofType(constants.HTTP_PROTOCOL_OPEN_LINK),
  mergeMap(async (action) => {
    try {
      const state = state$.value;
      const { link } = action.payload;
      const clearLink = link && link.replace(constants.HTTP_PROTOCOL, '');
      const [dappName, ...params] = clearLink.split('/').filter((item: string) => item);
      const requestDapp = AppsManager.getDappItem(dappName);

      if (!requestDapp) {
        throw Error('Dapp does not exist');
      }

      const activeDapp = Dapp.getActiveDappName();
      const requestDappName = requestDapp.appName;
      const isDappOpen = activeDapp === requestDappName;

      if (!isDappOpen || !AppsManager.isDappReady(requestDappName)) {
        await ClientManager.switchDapp(requestDappName);
      }

      const createdDapp = Dapp.getDappByName(requestDappName);

      if (createdDapp) {
        createdDapp.openLink(params);
      }

      return httpProtocolActions.httpProtocolOpenLinkSuccess(link);
    } catch (error) {
      return httpProtocolActions.httpProtocolOpenLinkFailure(action.payload.link, error);
    }
  }),
);

export default combineEpics(
  httpProtocolOpenLink,
);
