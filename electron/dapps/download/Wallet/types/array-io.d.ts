declare module 'dapp-io';

export as namespace DappIO;

export class Keychain {
  constructor();
  sign(transaction: string): Promise<any>;
  publicKey(): Promise<any>;
}

export class Ethereum {
  constructor();
  buildTransaction(signature: string, from:string, to: string, value: number): Promise<string>;
  publishTransaction(transaction: string): Promise<string>;
  publicToAddress(publicKey: string): Promise<string>;
}

export class Logger {
  constructor();
  write(message: string): Promise<any>;
}