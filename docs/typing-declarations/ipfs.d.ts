import * as IPFS from 'ipfs'

export abstract class DAppIPFS {
  add(data: IPFS.FileContent, options: any): Promise<IPFS.IPFSFile[]>;
  add(data: IPFS.FileContent): Promise<IPFS.IPFSFile[]>;

  cat(hash: IPFS.Multihash): Promise<IPFS.FileContent>;
  get(hash: IPFS.Multihash): Promise<IPFS.IPFSFile>;
}