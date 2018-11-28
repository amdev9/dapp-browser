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

  getPeers(): Promise<string[]>;

  leave(): Promise<any>;
}

type DappEvents = 'openLink' | 'setTrayCounter';

export class DappClass {
  constructor();

  on(event: DappEvents, callback: (error: any, result: any) => void): any;

  emit(event: DappEvents, ...args: any[]): any;
}
