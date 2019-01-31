import { action } from 'typesafe-actions';
import { models as AppsManagerModels } from '../../modules/AppsManager';
import * as constants from '../constants';

export type NotifyItem = {
  id: string,
  message: string;
  icon: string;
  appName: string;
  created: Date;
  onClick: string;
};

export const switchDapp = (dappName: string) => action(constants.SWITCH_DAPP, {
  targetDappName: dappName,
});

export const switchDappSuccess = (dappName: string) => action(constants.SWITCH_DAPP_SUCCESS, {
  targetDappName: dappName,
});

export const switchDappFailure = (dappName: string, error: string) => action(constants.SWITCH_DAPP_FAILURE, {
  error,
  targetDappName: dappName,
});

export const toggleHome = (openStatus: boolean) => action(constants.TOGGLE_HOME, {
  isHome: openStatus,
});

export const clientToggleHome = (openStatus: boolean) => action(constants.CLIENT_TOGGLE_HOME, {
  isHome: openStatus,
});

export const toggleAppHome = (dappName: string) => action(constants.TOGGLE_APP_HOME, {
  targetDappName: dappName,
});

export const addAppItem = (appItem: AppsManagerModels.AppItem) => action(constants.ADD_APP_ITEM, {
  item: appItem,
});

export const removeTrayItem = (targetDappName: string) => action(constants.REMOVE_TRAY_ITEM, { targetDappName })
