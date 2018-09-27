import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { CLOSE_MANAGER, TOGGLE_PERMISSION } from '../constants';
import { AppItem } from '../model';

export interface TrayAction extends Action {
  payload?: {
    targetDappName?: string,
    item?: AppItem,
    isHome?: boolean,
    dappName?: string
  }
}

export const closeManager = (dappName: string):
  TrayAction => action(CLOSE_MANAGER, {
    targetDappName: dappName
  });

export const togglePermission = (TrayItem: AppItem):
  TrayAction => action(TOGGLE_PERMISSION, {
    item: TrayItem
  });
 