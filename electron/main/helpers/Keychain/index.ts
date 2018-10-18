import { platform } from "os";
import { Queue, Task, TaskProcess } from "./queue";

export { Queue, TaskProcess, Task };

export function getDefaultExecPath(): string {
  const info = platform();

  switch (info) {
    case "linux":
      return "./bin/keychain.ubuntu";
    case "darwin":
      return "./bin/keychain.macos";
    case "win32":
      return "bin/keychain.exe";
    default:
      return "unknown";
  }
}

export class Keychain {
  // Path to keychain bin
  private path: string;
  // Tick based keychain task manager
  private queue: Queue;

  constructor(path?: string) {
    this.path = path ? path : getDefaultExecPath();
    this.queue = new Queue(this.path);
  }

  public sign(
    key: Keychain.Key,
    chainId: Keychain.ChainId,
    transaction: Keychain.Transaction,
  ): Promise<Keychain.Signed> {
    return new Promise((resolve, reject) => {
      const properties = {
        chainid: chainId,
        keyname: key,
        transaction,
      };

      this.queue.push({
        command: "CMD_SIGN",
        params: properties,
        promise: { resolve, reject },
      });
    });
  }

  public create(key: Keychain.Key, cipher: Keychain.Cipher, curve: Keychain.Curve): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const properties = {
        algo: cipher,
        curve,
        keyname: key,
      };

      this.queue.push({
        command: "CMD_CREATE",
        params: properties,
        promise: { resolve, reject },
      });
    });
  }

  public list(): Promise<Keychain.Key[]> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        command: "CMD_LIST",
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
    AES256 = "CIPHER_AES256",
  }

  export enum Curve {
    SECP256K1 = "CURVE_SECP256K1",
  }
}
