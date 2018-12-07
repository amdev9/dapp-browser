declare module 'array-io';

export as namespace ArrayIO;

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