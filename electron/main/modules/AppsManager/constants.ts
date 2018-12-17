import * as path from 'path';
import { isDev } from '../../helpers/constants/globalVariables';

export const DAPPS_PATH: string =
  isDev ? path.join(__dirname, '..', '..', 'dapps', 'download') : path.join(__dirname, 'dapps', 'download');

export const DAPP_SET_FOCUS = 'DAPP_SET_FOCUS';
export const DAPP_RESET_FOCUS = 'DAPP_RESET_FOCUS';
export const DAPP_CONTENT_LOADED = 'DAPP_CONTENT_LOADED';

export const ON_DAPP_INSTALL = 'ON_DAPP_INSTALL';
export const DAPP_DOWNLOAD = 'DAPP_DOWNLOAD';
export const DAPP_DOWNLOAD_SUCCESS = 'DAPP_DOWNLOAD_SUCCESS';
export const DAPP_DOWNLOAD_FAILURE = 'DAPP_DOWNLOAD_FAILURE';
export const GET_ALL_DAPPS = 'GET_ALL_DAPPS';
export const GET_ALL_DAPPS_SUCCESS = 'GET_ALL_DAPPS_SUCCESS';
export const GET_ALL_DAPPS_FAILURE = 'GET_ALL_DAPPS_FAILURE';
