import * as IPFS from 'ipfs';

export as namespace ipfsPubsubRoom;

export = IpfsPubsubRoom;

declare class IpfsPubsubRoom {
  constructor(ipfs: IPFS, topic: string, options?: { pollInterval: number });

  _ipfs: IPFS;
  leave(): void;
  sendTo(peer: string, message: string | Buffer): void;
  broadcast(message: string | Buffer): void;
  getPeers(): string[];
  hasPeer(peer: string): boolean;

  on(event: 'message', callback: (message: { from: string, data: Buffer }) => void): void;
  on(event: 'subscribed', callback: () => void): void;
  on(event: 'peer joined', callback: (peer: string) => void): void;
  on(event: 'peer left', callback: (peer: string) => void): void;
}

declare namespace IpfsPubsubRoom {}
