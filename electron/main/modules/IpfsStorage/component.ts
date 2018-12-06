import * as fs from 'fs';
import * as IPFS from 'ipfs';
import * as pathModule from 'path';

import { Path } from '../FileManager/index';
import { IPFSGetResult } from '../../types/ipfs/index';
import { remoteConfig } from '../../helpers/config/ipfs';
import { getReadyIpfsInstance } from '../../helpers/systemComponents/IpfsInstance';

export interface IpfsFileObject {
  hash: string;
  path: string;
  size: number;
}

const EXEC_TIMEOUT = 10000;

const functionPromiseTimeout = (f: () => Promise<any>, timeout: number) => {
  if (!(f instanceof Function)) {
    throw Error('First argument is not a function');
  }

  const result = f();

  if (!(result instanceof Promise)) {
    return result;
  }

  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      reject('Timeout error');
    }, timeout);

    result
      .then(data => resolve(data))
      .catch(error => reject(error))
      .finally(() => clearTimeout(timerId));
  });
};

class IpfsStorage {
  ipfs: Promise<IPFS>;

  constructor(configuration: IPFS.Options) {
    this.ipfs = getReadyIpfsInstance();
  }

  async uploadFile(filePath: Path): Promise<IpfsFileObject | null> {
    if (!filePath) {
      return;
    }

    const ipfs = await this.ipfs;

    const file = { path: pathModule.basename(filePath), content: fs.createReadStream(filePath) };

    const handler = (p: any) => { console.log(p); };
    const options = {
      progress: handler,
      wrapWithDirectory: true,
    };

    const ipfsFiles = await ipfs.files.add([file], options);

    if (!ipfsFiles || !ipfsFiles.length) {
      return null;
    }

    return ipfsFiles[ipfsFiles.length - 1];
  }

  async downloadFile(hash: string): Promise<IPFSGetResult | null> {
    if (!hash) {
      return;
    }

    const ipfs = await this.ipfs;

    const files: any = await functionPromiseTimeout(() => {
      return ipfs.files.get(hash);
    }, EXEC_TIMEOUT);

    if (!files || !files.length) {
      throw Error('File with current hash does not exist');
    }

    return files[files.length - 1];
  }

  async downloadFolder(hash: string): Promise<IPFSGetResult[] | null> {
    if (!hash) {
      return;
    }
    const ipfs = await this.ipfs;
    const files: any = await ipfs.files.get(hash);
    if (!files || !files.length) {
      throw Error('File with current hash does not exist');
    }
    return files;
  }
}

export default new IpfsStorage(remoteConfig);
