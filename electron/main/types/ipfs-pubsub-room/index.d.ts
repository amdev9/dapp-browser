import * as IPFS from 'ipfs';

// declare type RoomType = (ipfs: IPFS, topic: string) => any

// declare namespace IpfsPubsubRoom {
//   export interface LogOptions {
//     verbose?: boolean;
//   }
// }
//
// declare global {
//   /*~ Here, declare things that go in the global namespace, or augment
//    *~ existing declarations in the global namespace
//    */
//   export type ipfsPubsubRoom = (ipfs: IPFS, topic: string) => any
// }
// declare module "ipfs-pubsub-room" {
//   type ipfsPubsubRoom = () => any
// }
// type Room = () => any
//
// export = Room
// //
// declare const IpfsPubsubRoomD: Room;
// declare function getFieldList(): string[];
//
// export = getFieldList;

export as namespace ipfsPubsubRoom;

export = IpfsPubsubRoom;

declare class IpfsPubsubRoom {
  constructor(ipfs: IPFS, topic: string, options?: { pollInterval: number });

  leave(): void;
  sendTo(peer: string, message: string | Buffer): void;
  broadcast(message: string | Buffer): void;
  getPeers(): string;
  hasPeer(peer: string): boolean;

  on(event: 'message', callback: (message: { from: string, data: Buffer }) => void): void;
  on(event: 'subscribed', callback: () => void): void;
  on(event: 'peer joined', callback: (peer: string) => void): void;
  on(event: 'peer left', callback: (peer: string) => void): void;
}

declare namespace IpfsPubsubRoom {
}
