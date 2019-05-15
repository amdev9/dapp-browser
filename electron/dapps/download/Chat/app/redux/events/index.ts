import * as constants from '../constants';

const DappIO = require('dapp-io');

export const setTrayCounter = (counter: number) => DappIO.Dapp.emit(constants.EVENT_SET_TRAY_COUNTER, counter);
