import * as fs from 'fs';
import * as IPFS from 'ipfs';
import * as pathModule from 'path';

import { Path } from './FileManager';
import { IPFSGetResult } from '../types/ipfs';
import { remoteConfig } from './config/ipfs'
import {getReadyIpfsInstance} from "./IpfsInstance";

export interface IpfsFileObject {
  hash: string;
  path: string;
  size: number;
}

export type IpfsFileObjectList = Array<IpfsFileObject>

class IpfsStorage{
  ipfs: Promise<IPFS>;

  constructor(configuration: IPFS.Options) {
    this.ipfs = getReadyIpfsInstance()
  }

  async uploadFile(filePath: Path): Promise<IpfsFileObject | null> {
    if (!filePath){
      return
    }

    const ipfs = await this.ipfs

    const file = { path: pathModule.basename(filePath), content: fs.createReadStream(filePath) }

    const handler = (p: any) => { console.log(p); }
    const options = {
      progress: handler,
      wrapWithDirectory: true,
    }

    const ipfsFiles = await ipfs.files.add([file], options)

    if (!ipfsFiles || !ipfsFiles.length){
      return null
    }

    return ipfsFiles[ipfsFiles.length - 1]
  }

  async downloadFile(hash: string): Promise<IPFSGetResult | null> {
    if (!hash) {
      return
    }

    const ipfs = await this.ipfs

    const files = <IPFSGetResult[]> await ipfs.files.get(hash)

    if (!files || !files.length){
      return null
    }

    return files[files.length - 1]
  }

}


export default new IpfsStorage(remoteConfig);
