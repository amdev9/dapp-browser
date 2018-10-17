import * as fs from 'fs';
import * as IPFS from 'ipfs';
import * as pathModule from 'path';

import IpfsBaseComponent from './IpfsBaseComponent'
import { Path } from './FileManager';
import { IPFSGetResult } from '../types/ipfs';
import { remoteConfig } from './config/ipfs'

export interface IpfsFileObject {
  hash: string;
  path: string;
  size: number;
}

export type IpfsFileObjectList = Array<IpfsFileObject>

class IpfsStorage extends IpfsBaseComponent {
  constructor(configuration: IPFS.Options) {
    super(configuration)
  }

  async uploadFile(filePath: Path): Promise<IpfsFileObject | null> {
    if (!filePath){
      return
    }

    // Check online status
    await this.readyState

    const file = { path: pathModule.basename(filePath), content: fs.createReadStream(filePath) }

    const handler = (p: any) => { console.log(p); }
    const options = {
      progress: handler,
      wrapWithDirectory: true,
    }

    const ipfsFiles = await this.ipfs.files.add([file], options)

    if (!ipfsFiles || !ipfsFiles.length){
      return null
    }

    return ipfsFiles[ipfsFiles.length - 1]
  }

  async downloadFile(hash: string): Promise<IPFSGetResult | null> {
    if (!hash) {
      return
    }

    // Check online status
    await this.readyState

    const files = <IPFSGetResult[]> await this.ipfs.files.get(hash)

    if (!files || !files.length){
      return null
    }

    return files[files.length - 1]
  }

}


export default new IpfsStorage(remoteConfig);
