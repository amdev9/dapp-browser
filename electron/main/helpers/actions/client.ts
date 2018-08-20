
import { action } from 'typesafe-actions';
import { Action } from 'redux';
 
export const SWITCH_DAPP = 'SWITCH_DAPP';
export const TOGGLE_HOME = 'TOGGLE_HOME';


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
