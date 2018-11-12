declare module 'array-io';

interface SubscribeOptions {
  onMessage: (message: any) => void;
  onJoined?: (peer: string) => void;
  onLeft?: (peer: string) => void;
  onSubscribe?: (peer: string) => void;
}

declare class Chat {
  constructor()

  subscribe(topic: string, options: SubscribeOptions): Promise<void>;
  sendMessageBroadcast(message: string): Promise<any>;
  sendMessageTo(message: string, peer: string): Promise<any>;
  leave(): Promise<any>;
}

export {
  Chat,
};
