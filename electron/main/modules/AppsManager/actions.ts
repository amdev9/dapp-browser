import { action } from 'typesafe-actions';
import * as constants from './constants';

export const dappSetFocus = (targetUUID: string) => action(constants.DAPP_SET_FOCUS, null, { targetUUID });
export const dappResetFocus = (targetUUID: string) => action(constants.DAPP_RESET_FOCUS, null, { targetUUID });
export const onDappInstall = (dappName: string, hash: string) => action(constants.ON_DAPP_INSTALL, { dappName, hash })
