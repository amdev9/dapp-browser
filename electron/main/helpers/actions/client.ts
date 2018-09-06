
import { action } from 'typesafe-actions';
import { Action } from 'redux';

export const SWITCH_DAPP = 'SWITCH_DAPP';
export const TOGGLE_HOME = 'TOGGLE_HOME';
export const TOGGLE_NOTIFICATION_PANEL = 'TOGGLE_NOTIFICATION_PANEL';
export const TOGGLE_STATUS_BAR_PANEL = 'TOGGLE_STATUS_BAR_PANEL';
export const TOGGLE_LOADER_PANEL = 'TOGGLE_LOADER_PANEL';
export const APPS_FEED_RESIZE = 'APPS_FEED_RESIZE';


export interface TrayAction extends Action {
  payload?: {
    targetDappId?: number,
    targetDappName?: string,
    isHome?: boolean
  };
}


export function switchDapp(dappId: number, dappName: string) {
  return {
    type: SWITCH_DAPP,
    payload: {
      targetDappId: dappId,
      targetDappName: dappName
    }
  };
}


export const toggleHome = (openStatus: boolean):
  TrayAction => action(TOGGLE_HOME, {
    isHome: openStatus
  });
