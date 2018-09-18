import { spawn, ChildProcess } from "child_process";
import { Queue, TaskProcess, Task } from "./queue";
import { EOL, platform } from "os";
import { rejects } from "assert";

export { Queue, TaskProcess, Task };
const RESPONSE_TIMEOUT = 1000;
const MAX_RETRIES = 3;

export function getDefaultExecPath():string {
    const info = platform();
    
    switch (info) {
        case "linux":
            return "./keychain.ubuntu.16.04"
        case "darwin":
            return "./keychain.macos"
	    case "win32":
            return "keychain.exe"
        default:
            return "unknown"
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

    sign(key: Keychain.Key, chainId: Keychain.ChainId, transaction: Keychain.Transaction): Promise<Keychain.Signed> {
        return new Promise((resolve, reject) => {
            let properties = {
                chainid: chainId,
                keyname: key,
                transaction,
            };

            this.queue.push({
                promise: { resolve, reject },
                command: "CMD_SIGN",
                params: properties,
            });
        })
    }

    create(key: Keychain.Key, cipher: Keychain.Cipher, curve: Keychain.Curve): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let properties = {
                keyname: key,
                algo: cipher,
                curve,
            };

            this.queue.push({
                promise: { resolve, reject },
                command: "CMD_CREATE",
                params: properties,
            });
        })
    }

    list(): Promise<Keychain.Key[]> {
        return new Promise((resolve, reject) => {
            this.queue.push({
                promise: { resolve, reject },
                command: "CMD_LIST"
            });
        })
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