import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const httpProtocolOpenLink = (params: string[]) =>
  action(constants.HTTP_PROTOCOL_OPEN_LINK, { params });
