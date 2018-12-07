import { action } from 'typesafe-actions';
import * as constants from './constants';

export const httpProtocolOpenLink = (link: string) =>
  action(constants.HTTP_PROTOCOL_OPEN_LINK, { link });

export const httpProtocolOpenLinkSuccess = (link: string) =>
  action(constants.HTTP_PROTOCOL_OPEN_LINK_SUCCESS, { link });

export const httpProtocolOpenLinkFailure = (link: string, error: string) =>
  action(constants.HTTP_PROTOCOL_OPEN_LINK_FAILURE, { link, error });
