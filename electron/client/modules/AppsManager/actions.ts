import { action } from 'typesafe-actions';

import * as constants from './constants';

export const updateInstalledDapps = (dappsList: any) => action(constants.UPDATE_INSTALLED_DAPPS, { dappsList });
export const openDapp = (dappName: string) => action(constants.CLIENT_OPEN_DAPP, { dappName });
