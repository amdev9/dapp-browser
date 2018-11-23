import { action } from 'typesafe-actions';

import * as constants from '../constants';

export const setTrayCounter = (counter: number) => action(constants.DAPP_SET_TRAY_COUNTER, { counter })
