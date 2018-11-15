import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const httpProtocolOpenLink = (link: string) =>
  action(constants.HTTP_PROTOCOL_OPEN_LINK, { link });

export const dappActionOpenLink = (params: string[], targetUUID: string) =>
  action(constants.DAPP_ACTION_OPEN_LINK, { params }, { targetUUID });
