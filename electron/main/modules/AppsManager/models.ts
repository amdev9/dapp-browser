import * as Bluebird from 'bluebird';

export type AppItem = {
  id?: number;
  appName: string;
  main: string;
  icon: string;
  statusIcon: string[];
  preview: string;
  permissions: string[]
};

export interface ReadyDapp {
  name: string;
  uuid: string;
}

declare global {
  export interface Promise<T> extends Bluebird<T> {
  }

  interface PromiseConstructor {
    delay: typeof Bluebird.prototype.delay;
  }
}

declare const Promise: any;
