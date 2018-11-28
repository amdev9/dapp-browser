import { platform } from 'os';
import { Queue } from './queue';

export function getDefaultExecPath(): string {
  const info = platform();

  switch (info) {
    case 'linux':
      return './bin/keychain.ubuntu';
    case 'darwin':
      return './bin/keychain.macos';
    case 'win32':
      return 'bin/keychain.exe';
    default:
      return 'unknown';
  }
}

export class Keychain {
  // Path to keychain bin
  path: string;
  // Tick based keychain task manager
  queue: Queue;

  constructor(path?: string) {
    this.path = path ? path : getDefaultExecPath();
    this.queue = new Queue(this.path);
  }

  public sign(
    key: Keychain.Key,
    chainId: Keychain.ChainId,
    transaction: Keychain.Transaction,
  ): Promise<Keychain.Signed> {

    const properties = {
      transaction,
      chainid: chainId,
      keyname: key,
    };

    return new Promise((resolve, reject) => {
      this.queue.push({
        command: 'sign',
        params: properties,
        promise: { resolve, reject },
      });
    });
  }

  public unlock(key: Keychain.Key): Promise<boolean> {
    const properties = {
      keyname: key,
    };

    return new Promise((resolve, reject) => {
      this.queue.push({
        command: 'unlock',
        params: properties,
        promise: { resolve, reject },
      });
    });
  }

  public create(key: Keychain.Key, cipher: Keychain.Cipher, curve: Keychain.Curve): Promise<boolean> {
    const properties = {
      keyname: key,
      encrypted: true,
      curve: 'secp256k1',
      cipher: 'aes256',
    };

    return new Promise((resolve, reject) => {
      this.queue.push({
        command: 'create',
        params: properties,
        promise: { resolve, reject },
      });
    });
  }

  public list(): Promise<Keychain.Key[]> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        command: 'list',
        promise: { resolve, reject },
      });
    });
  }

  public lock(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        command: 'lock',
        promise: { resolve, reject },
      });
    });
  }
}

export namespace Keychain {
  export type Transaction = string;
  export type ChainId = string;
  export type Signed = string;
  export type Key = string;

  export enum Cipher {
    AES256 = 'CIPHER_AES256',
  }

  export enum Curve {
    SECP256K1 = 'CURVE_SECP256K1',
  }
}
