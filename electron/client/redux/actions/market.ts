import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const downloadDapp = (ipfsHash: string) => action(constants.MARKET_DOWNLOAD_DAPP, { ipfsHash });
