import { protocol } from 'electron';
import { component as AppsManager } from '../AppsManager';
import { component as Dapp } from '../Dapp';
import * as constants from './constants';

export default class HttpProtocol {
  static async openLink(link: string) {
    const clearLink = link && link.replace(constants.HTTP_PROTOCOL, '');
    const [dappName, ...params] = clearLink.split('/').filter((item: string) => item);
    const requestDapp = AppsManager.getInstalledDappItem(dappName);

    if (!requestDapp) {
      throw Error('Dapp does not exist');
    }

    const activeDapp = Dapp.getActiveDappName();
    const requestDappName = requestDapp.appName;
    const isDappOpen = activeDapp === requestDappName;

    if (!isDappOpen || !AppsManager.isDappReady(requestDappName)) {
      await AppsManager.openDapp(requestDappName);
    }

    const createdDapp = Dapp.getDappByName(requestDappName);

    if (createdDapp) {
      createdDapp.openLink(params);
    }
  }

  static registerHttpProtocol() {
    protocol.registerHttpProtocol(constants.HTTP_PROTOCOL_PREFIX, (req, cb) => {
      HttpProtocol.openLink(req.url);
    }, (err) => {
      if (!err) {
        logger.log('registered arr protocol');
      } else {
        logger.error('could not register arr protocol');
        logger.error(err);
      }
    });
  }
}
