declare module 'array-io';

export as namespace ArrayIO;

export class Keychain {
  constructor();
  sign(transaction: string): Promise<any>;
  publicKey(): Promise<any>;
}
