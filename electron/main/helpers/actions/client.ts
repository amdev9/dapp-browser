
import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { AppItem } from '../AppsManager';
import { SWITCH_DAPP, TOGGLE_HOME, TOGGLE_LOADER_PANEL, TOGGLE_STATUS_BAR_PANEL, TOGGLE_APP_HOME, ADD_APP_ITEM } from '../constants';

export interface ClientAction extends Action {
  payload?: {
    targetDappName?: string,
    isHome?: boolean,
    isFileDialogOpen?: boolean
  };
}

export function switchDapp(dappName: string) {
  return {
    type: SWITCH_DAPP,
    payload: {
      targetDappName: dappName
    }
  };
}

export const toggleHome = (openStatus: boolean):
  ClientAction => action(TOGGLE_HOME, {
    isHome: openStatus
  });

export const toggleAppHome = (dappName: string):
  ClientAction => action(TOGGLE_APP_HOME, {
    targetDappName: dappName
  });

export const addAppItem = (appItem: AppItem) => ({ 
    type: ADD_APP_ITEM, 
    payload: {
      item: appItem
    } 
  });
  
