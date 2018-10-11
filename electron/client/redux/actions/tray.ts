import { action } from 'typesafe-actions';
import * as constants from '../constants';
import { AppItem } from '../model';

export const switchDapp = (dappName: string) => action(constants.SWITCH_DAPP, {
    targetDappName: dappName
  });

export const addAppItem = (TrayItem: AppItem) => action(constants.ADD_APP_ITEM, {
    item: TrayItem
  });

export const toggleHome = (openStatus: boolean) => action(constants.TOGGLE_HOME, {
    isHome: openStatus
  });

export const toggleAppHome = (dappName: string) => action(constants.TOGGLE_APP_HOME, {
    targetDappName: dappName
  });

export const setTrayProgress = (dappName: string, indicator: string) => action(constants.SET_TRAY_PROGRESS, {
    targetDappName: dappName,
    indicator
  });

export const removeTrayItem = (dappName: string) => action(constants.REMOVE_TRAY_ITEM, {  
  targetDappName: dappName 
});

export const setTrayCounter = (dappName: string, counter: string) => action(constants.SET_TRAY_COUNTER, { 
  targetDappName: dappName, 
  counter 
});


