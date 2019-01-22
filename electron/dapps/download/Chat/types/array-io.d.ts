declare module 'array-io';

export as namespace ArrayIO;

export interface NotificationOptions {
  title: string;
  body: string;
}

export interface NotificationEvents {
  onClick?: () => void;
  onClose?: () => void;
}

interface SubscribeOptions {
  onMessage: (message: any) => void;
  onJoined?: (peer: string) => void;
  onLeft?: (peer: string) => void;
  onSubscribe?: (peer: string) => void;
}

export interface IpfsFileEntry {
  id: string;
  hash: string;
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

declare class FileManager {

  openFile(): void;
}

declare class IpfsStorage {

  uploadIpfsFile(hash: string, onProgressUpdate: (progress: string) => void): Promise<IpfsFileEntry>;
  downloadIpfsFile(entry: string): Promise<IpfsFileEntry>;
}

export {
  IpfsRoom,
  Dapp,
  Keychain,
  Notification,
  FileManager,
  IpfsStorage,
};
