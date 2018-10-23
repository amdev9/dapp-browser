import * as IPFS from 'ipfs';
import { remoteConfig } from "./config/ipfs";

const ipfs = new IPFS({
  ...remoteConfig,
  repo: `ipfs/pubsub/${Math.random()}`,
});

export const readyState = new Promise((resolve, reject) => {
  ipfs.on('ready', () => {
    if (ipfs.isOnline()) {
      console.log('online');
      resolve()
    } else {
      console.log('offline, try to start');
      ipfs.start();
    }
  });

  ipfs.on('error', (error: Error) => {
    reject(error);
  });
})

export default ipfs
