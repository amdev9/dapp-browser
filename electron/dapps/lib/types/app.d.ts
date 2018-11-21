// declare module 'array-io';

import { EventEmitter } from "events";

interface SubscribeOptions {
  onMessage: (message: any) => void;
  onJoined?: (peer: string) => void;
  onLeft?: (peer: string) => void;
  onSubscribe?: (peer: string) => void;
}

declare class IpfsRoom {
  constructor()

  subscribe(topic: string, options: SubscribeOptions): Promise<void>;
  sendMessageBroadcast(message: string): Promise<any>;
  sendMessageTo(message: string, peer: string): Promise<any>;
  leave(): Promise<any>;
}

declare class Keychain {
  constructor();
  sign(): Promise<any>;
}

declare class DappClass {
  constructor()

}

export {
  IpfsRoom,
  DappClass,
  Keychain,
};
