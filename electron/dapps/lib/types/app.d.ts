declare module 'array-io';

import { NotificationEvents, NotificationOptions } from '../classes/Notification';

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

declare class Dapp {
  on(event: string, callback: (error: any, result: any) => void): any;

  emit(event: string, ...args: any[]): any;
}

declare class Notification {

  showNotification(options: NotificationOptions, events: NotificationEvents): void;
}

export {
  IpfsRoom,
  Dapp,
  Keychain,
};
