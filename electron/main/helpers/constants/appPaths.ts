import * as path from 'path';
import * as os from 'os';

const isDev = process.env.ELECTRON_ENV === 'development';

export const RENDERER_PATH: string =
  isDev ? path.join(__dirname, '..', '..', 'client') : path.join(__dirname, 'client');

export const PERMISSION_PATH: string =
  isDev ? path.join(__dirname, '..', '..', 'permissionManager') : path.join(__dirname, 'permissionManager');

export const appTempPath = path.join(os.tmpdir(), 'array-io-client-temp');

export const dbPath = path.join(appTempPath, 'db');
export const dappsPath = path.join(appTempPath, 'dapps');
