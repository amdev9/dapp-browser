
import { action } from 'typesafe-actions';
import { Action } from 'redux';

import { SWITCH_DAPP, TOGGLE_HOME, TOGGLE_LOADER_PANEL, TOGGLE_STATUS_BAR_PANEL, TOGGLE_APP_HOME } from '../constants';

export interface TrayAction extends Action {
  payload?: {
    targetDappId?: number,
    targetDappName?: string,
    isHome?: boolean,
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

export const toggleAppHome = (dappName: string):
  TrayAction => action(TOGGLE_APP_HOME, {
    targetDappName: dappName
  });
