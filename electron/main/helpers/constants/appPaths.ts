import * as path from 'path';

const isDev = process.env.ELECTRON_ENV === 'development';

export const DAPPS_PATH: string =
  isDev ? path.join(__dirname, '..', '..', 'dapps', 'download') : path.join(__dirname, 'dapps', 'download');

export const RENDERER_PATH: string =
  isDev ? path.join(__dirname, '..', '..', 'client') : path.join(__dirname, 'client');

export const PERMISSION_PATH: string =
  isDev ? path.join(__dirname, '..', '..', 'permissionManager') : path.join(__dirname, 'permissionManager');
