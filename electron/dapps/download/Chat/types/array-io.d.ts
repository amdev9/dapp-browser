declare module 'array-io';

export as namespace ArrayIO;

interface SubscribeOptions {
  onMessage: (message: any) => void;
  onJoined?: (peer: string) => void;
  onLeft?: (peer: string) => void;
  onSubscribe?: (peer: string) => void;
}

export class IpfsRoom {
  constructor()

  subscribe(topic: string, options: SubscribeOptions): Promise<void>;

  sendMessageBroadcast(message: string): Promise<any>;

  sendMessageTo(message: string, peer: string): Promise<any>;

  leave(): Promise<any>;
}

export class DappClass {
  constructor();

  on(event: string, callback: (error: any, result: any) => void): any;
}
