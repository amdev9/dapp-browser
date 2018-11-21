declare module 'array-io';

export as namespace ArrayIO;

export class Keychain {
  constructor();
  sign(doSomething: Function): Promise<any>;
}
