import * as fs from 'fs';
import * as IPFS from 'ipfs';
import * as pathModule from 'path';

import { IPFSGetResult } from '../../types/ipfs';
import { remoteConfig } from '../../helpers/config/ipfs';
import { getReadyIpfsInstance } from '../../helpers/systemComponents/IpfsInstance';
import { functionPromiseTimeout } from '../../helpers/utils';
import * as utils from './utils';

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

  async uploadFile(filePath: string, progressHandler?: ((progress: number) => void) | null): Promise<IpfsFileObject | null> {
    if (!filePath) {
      return;
    }

    const ipfs = await this.ipfs;

    const file = { path: pathModule.basename(filePath), content: fs.createReadStream(filePath) };

    const fileStat = await fs.promises.stat(filePath);

    const fileSize = fileStat.size;
    const options = {
      wrapWithDirectory: true,
      recursive: true,
      progress: progressHandler ? (progress: number) => progressHandler(progress / fileSize * 100) : null,
    };

    const ipfsFiles = await ipfs.files.add([file], options);

    if (!ipfsFiles || !ipfsFiles.length) {
      return null;
    }

    return ipfsFiles[ipfsFiles.length - 1];
  }

  async uploadFileWithSendStatus(path: string): Promise<IpfsFileObject | null>  {
    const fileEntry = await utils.beforeUploadFileHookClient(path);

    const ipfsObject = await this.uploadFile(path, (progress) => {
      utils.progressUploadHookClient(fileEntry.id, progress);
    });

    utils.afterUploadFileHookClient(fileEntry, ipfsObject.hash);

    return ipfsObject;
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
