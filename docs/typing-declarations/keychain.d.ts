export namespace Keychain {
  export type Transaction = string;
  export type ChainId = string;
  export type Signed = string;
  export type Key = string;

  export enum Cipher {
    AES256,
  }

  export enum Curve {
    SECP256K1
  }
}

export interface ActiveKey {
  // Protected field allowed only if dapp have ["keychain"] permission
  // key: Keychain.Key; @rejected

  // Active key instanse for sign - simlink bind to static Keychain.sign
  sign(chainId: Keychain.ChainId, transaction: Keychain.Transaction): Promise<Keychain.Signed>;
}

export abstract class Keychain {
  // Protected methods allowed only if have permission ["keychain"]
  static sign(key: Keychain.Key, chainId: Keychain.ChainId, transaction: Keychain.Transaction): Promise<Keychain.Signed>;
  static create(key: Keychain.Key, cipher: Keychain.Cipher, curve: Keychain.Curve): Promise<ActiveKey>;

  // Method for request sign of unlock keys selector in @client
  static requestSign(requestMessageInfo: string, chainId: Keychain.ChainId, transaction: Keychain.Transaction): Promise<Keychain.Signed>;

  // protected, allowed only for @client, dapp not have access to keys list
  static list(): Promise<Keychain.Key[]>;
}