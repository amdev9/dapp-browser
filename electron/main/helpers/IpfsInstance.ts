import * as IPFS from 'ipfs';
import { remoteConfig } from './config/ipfs';

export const getReadyIpfsInstance = (options: IPFS.Options = {}): Promise<IPFS> => {
  const ipfs = new IPFS({
    ...remoteConfig,
    ...options,
  });

  return new Promise((resolve, reject) => {
    ipfs.on('ready', () => {
      if (ipfs.isOnline()) {
        console.log('online');
        resolve(ipfs);
      } else {
        console.log('offline, try to start');
        ipfs.start();
      }
    });

    ipfs.on('error', (error: Error) => {
      reject(error);
    });
  });
};
