import * as fs from 'fs';
import * as IPFS from 'ipfs';
import * as pathModule from 'path';

import { models as FileManagerModels } from '../FileManager';
import { IPFSGetResult } from '../../types/ipfs';
import { remoteConfig } from '../../helpers/config/ipfs';
import { getReadyIpfsInstance } from '../../helpers/systemComponents/IpfsInstance';
import { functionPromiseTimeout } from '../../helpers/utils';

export interface IpfsFileObject {
  hash: string;
  path: string;
  size: number;
}

class IpfsStorage {
  ipfs: Promise<IPFS>;

  constructor(configuration: IPFS.Options) {
    this.ipfs = getReadyIpfsInstance();
  }

  async uploadFile(filePath: FileManagerModels.Path): Promise<IpfsFileObject | null> {
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

    const files: any = await functionPromiseTimeout(() => ipfs.files.get(hash));

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

  async pinAdd(hash: string) {
    if (!hash) {
      return;
    }

    const ipfs = await this.ipfs;
    const files: any = await ipfs.files.get(hash);
    ipfs.pin.add(hash);
  }
}

export default new IpfsStorage(remoteConfig);
