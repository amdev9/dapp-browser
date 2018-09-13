import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { SWITCH_DAPP, ADD_APP_ITEM, TOGGLE_HOME, TOGGLE_APP_HOME } from '../constants';
import { AppItem } from '../model';

export interface TrayAction extends Action {
  payload?: {
    targetDappName?: string,
    item?: AppItem,
    isHome?: boolean,
    dappName?: string
  }
}

export const switchDapp = (dappName: string):
  TrayAction => action(SWITCH_DAPP, {
    targetDappName: dappName
  });

export const addAppItem = (TrayItem: AppItem):
  TrayAction => action(ADD_APP_ITEM, {
    item: TrayItem
  });

export const toggleHome = (openStatus: boolean):
  TrayAction => action(TOGGLE_HOME, {
    isHome: openStatus
  });

export const toggleAppHome = (dappName: string):
  TrayAction => action(TOGGLE_APP_HOME, {
    targetDappName: dappName
  });
