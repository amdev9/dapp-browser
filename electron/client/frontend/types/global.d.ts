/** Global definitions for development **/
import * as Bluebird from "bluebird"

// for assets
declare module '*.css' {
  const styles: any;
  export = styles;
}

declare module '*.svg' {
  const vector: string;
  export = vector;
}

// Bluebird as global Promise
declare global {
  export interface Promise<T> extends Bluebird<T> { }
  interface PromiseConstructor {
    delay: typeof Bluebird.prototype.delay;
  }
}