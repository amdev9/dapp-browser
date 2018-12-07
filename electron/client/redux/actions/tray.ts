import { action } from 'typesafe-actions';
import * as constants from '../constants';
import { AppItem } from '../model';

export type DappsCounter = {
  dappName: string;
  counter: string;
};

export const switchDapp = (dappName: string) => action(constants.CLIENT_SWITCH_DAPP, {
  targetDappName: dappName
});

export const addAppItem = (TrayItem: AppItem) => action(constants.ADD_APP_ITEM, {
  item: TrayItem
});

export const toggleHome = (openStatus: boolean) => action(constants.CLIENT_TOGGLE_HOME, {
  isHome: openStatus
});

export const toggleSettingsPanel = () => action(constants.TOGGLE_SETTINGS_PANEL);

export const toggleAppHome = (dappName: string) => action(constants.TOGGLE_APP_HOME, {
  targetDappName: dappName
});

export const setTrayProgress = (dappName: string, indicator: string) => action(constants.SET_TRAY_PROGRESS, {
  indicator,
  targetDappName: dappName,
});

export const removeTrayItem = (dappName: string) => action(constants.REMOVE_TRAY_ITEM, {
  targetDappName: dappName
});

