import { action } from 'typesafe-actions';
import * as constants from './constants';

export const dappContentLoaded = () => action(constants.DAPP_CONTENT_LOADED);
export const dappSetFocus = (targetUUID: string) => action(constants.DAPP_SET_FOCUS, null, { targetUUID });
export const dappResetFocus = (targetUUID: string) => action(constants.DAPP_RESET_FOCUS, null, { targetUUID });

export const dappActionOpenLink = (params: string[], targetUUID: string) =>
  action(constants.DAPP_ACTION_OPEN_LINK, { params }, { targetUUID });

export const setTrayCounter = (counter: number) => action(constants.DAPP_SET_TRAY_COUNTER, { counter });

export const setMainTrayCounter = (dappName: string, counter: string) => action(constants.SET_MAIN_TRAY_COUNTER, {
  counter,
  targetDappName: dappName,
});
