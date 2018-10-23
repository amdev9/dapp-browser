
import { action } from 'typesafe-actions';
import { AppItem } from '../AppsManager';
import * as constants from '../constants';

export const switchDapp = (dappName: string) => action(constants.SWITCH_DAPP, {
  targetDappName: dappName,
});

export const toggleHome = (openStatus: boolean) => action(constants.TOGGLE_HOME, {
  isHome: openStatus,
});

export const toggleAppHome = (dappName: string) => action(constants.TOGGLE_APP_HOME, {
  targetDappName: dappName,
});

export const addAppItem = (appItem: AppItem) => action(constants.ADD_APP_ITEM, {
  item: appItem,
});
