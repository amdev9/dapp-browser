declare module 'array-io';

export as namespace ArrayIO;

export class Keychain {
  constructor();
  sign(): Promise<any>;
}
