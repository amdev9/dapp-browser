import { action } from 'typesafe-actions';
import { Action } from 'redux';

export const SWITCH_DAPP = 'SWITCH_DAPP';
export interface TrayAction extends Action {
  payload?: {
    targetDappId?: string
  }
}

export const switchDapp = (dappName: string) => action(SWITCH_DAPP, { targetDapp: dappName });
