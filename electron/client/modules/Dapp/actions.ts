import { action } from 'typesafe-actions';

import * as models from './models';
import * as constants from './constants';

export const setTrayCounters = (dappsList: models.DappsCounter[]) => action(constants.SET_TRAY_COUNTER, { dappsList });
