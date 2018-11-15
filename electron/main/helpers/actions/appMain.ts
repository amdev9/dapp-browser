import * as constants from '../constants';
import { action } from 'typesafe-actions';

export const createDappView = (targetDappName: string) => action(constants.CREATE_DAPP_VIEW, { targetDappName });
