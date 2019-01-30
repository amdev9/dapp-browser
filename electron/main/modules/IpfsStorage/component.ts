import * as fs from 'fs';
import * as IPFS from 'ipfs';
import * as pathModule from 'path';
import * as Stream from 'stream';

import { IPFSGetResult } from '../../types/ipfs';
import { remoteConfig } from '../../helpers/config/ipfs';
import { getReadyIpfsInstance } from '../../helpers/systemComponents/IpfsInstance';
import { functionPromiseTimeout } from '../../helpers/utils';
import * as models from './models';

class IpfsStorage {
  ipfs: Promise<IPFS>;

  constructor(configuration: IPFS.Options) {
    this.ipfs = getReadyIpfsInstance();
  }

  async uploadFile(file: { path: string, content: Stream.Readable }, progressHandler?: ((progress: number) => void) | null): Promise<models.IpfsFileObject> {
    if (!file) {
      return;
    }

    const ipfs = await this.ipfs;

    const options = {
      wrapWithDirectory: true,
      progress: progressHandler || null,
    };

    const stream = ipfs.files.addReadableStream(options);

    const ipfsFiles: any[] = [];

    stream.write(file);

    stream.end();

    const ipfsFileObject: any = await new Promise((resolve, reject) => {
      stream.on('data', (ipfsObject: models.IpfsFileObject) => {
        if (!ipfsObject.path) {
          resolve(ipfsObject);
        }
      });

      stream.on('error', (error: any) => {
        reject(error);
      });
    });

    return ipfsFileObject;
  }

  async uploadFileWithAbort(filePath: string, progressHandler?: ((progress: number) => void) | null): Promise<models.UploadFileControls> {
    const fileStream = fs.createReadStream(filePath);
    const file = { path: pathModule.basename(filePath), content: fileStream };

    const fileStat = await fs.promises.stat(filePath);

    const fileSize = fileStat.size;

    const uploadFile = this.uploadFile(file, (progress) => progressHandler(progress / fileSize * 100));

    const abort = () => {
      fileStream.close();
    };

    return {
      abort,
      file: uploadFile,
    };
  }

  async downloadFileWithAbort(hash: string, saveFolder: string): Promise<models.DownloadFileControls> {
    if (!hash) {
      throw new Error('Invalid hash');
    }

    const ipfs = await this.ipfs;

    let fileStream: Stream.Writable;

    const stream = ipfs.files.getReadableStream(hash);

    const filePromise: Promise<models.DownloadFileObject> = new Promise((resolve, reject) => {
      stream.on('error', (error) => reject(error));

      stream.on('data', (file) => {
        if (file.type !== 'dir') {

          const filePath = pathModule.join(saveFolder, file.name);
          fileStream = fs.createWriteStream(filePath);

          file.content.on('data', (data: Buffer) => {
            fileStream.write(data);
          });

          file.content.resume();
          file.content.on('end', async () => {
            const stats = await fs.promises.lstat(filePath);

            const downloadFileObject: models.DownloadFileObject = {
              path: filePath,
              size: stats.size,
              name: file.name,
            };

            resolve(downloadFileObject);
          });

          stream.on('close', () => file.content.end());
        }
      });
    });

    const abort = () => {
      stream.emit('error', new Error('Abort download'));
      stream.destroy();
    };

    return {
      abort,
      file: filePromise,
    };
  }

  async downloadFile(hash: string): Promise<IPFSGetResult | null> {
    if (!hash) {
      throw new Error('Invalid hash');
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
