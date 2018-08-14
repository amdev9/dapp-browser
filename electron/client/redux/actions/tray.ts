import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { SWITCH_DAPP, ADD_APP_ITEM } from '../constants';
import { AppItem } from '../model';

export interface TrayAction extends Action {
  payload?: {
    targetDappId?: number,
    targetDappName?: string,
    item?: AppItem
  }
}

export const switchDapp = (dappId: number, dappName: string): TrayAction => action(SWITCH_DAPP, { targetDappId: dappId, targetDappName: dappName });
export const addAppItem = (TrayItem: AppItem): TrayAction => action(ADD_APP_ITEM, { item: TrayItem });