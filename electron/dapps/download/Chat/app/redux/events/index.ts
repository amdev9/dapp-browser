import * as constants from '../constants';

const ArrayIO = require('array-io');

export const setTrayCounter = (counter: number) => ArrayIO.Dapp.emit(constants.EVENT_SET_TRAY_COUNTER, counter);
