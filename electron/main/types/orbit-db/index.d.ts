import * as IPFS from 'ipfs';
import { EventEmitter } from 'events';
import * as elliptic from 'elliptic';

export as namespace orbit_db;
export = OrbitDB;

declare class OrbitDB {

  stores: any;
  directory: string;
  keystore: any;
  key: elliptic.ec.KeyPair;

  constructor(ipfs: IPFS, directory?: string, options?: {
    peerId?: string,
    keystore?: any,
  });

  create(name: string, type: string, options?: OrbitDB.DBOptions): Promise<OrbitDB.Store>;
  create(name: string, type: 'eventlog', options?: OrbitDB.DBOptions): Promise<OrbitDB.EventStore<any>>;

  open(address: string, options?: OrbitDB.DBOptions): Promise<OrbitDB.Store>;

  disconnect(): Promise<void>;

  stop(): Promise<void>;

  feed(address: string, options?: OrbitDB.DBOptions): Promise<OrbitDB.FeedStore<any>>;

  log(address: string, options?: OrbitDB.DBOptions): Promise<OrbitDB.EventStore<any>>;

  eventlog(address: string, options?: OrbitDB.DBOptions): Promise<OrbitDB.EventStore<any>>;

  keyvalue(address: string, options?: OrbitDB.DBOptions): Promise<OrbitDB.KeyValueStore<any, any>>;

  kvstore(address: string, options?: OrbitDB.DBOptions): Promise<OrbitDB.KeyValueStore<any, any>>;

  counter(address: string, options?: OrbitDB.DBOptions): Promise<OrbitDB.CounterStore>;

  docs(address: string, options?: OrbitDB.DBOptions): Promise<OrbitDB.DocumentStore<any>>;

  docstore(address: string, options?: OrbitDB.DBOptions): Promise<OrbitDB.DocumentStore<any>>;

  static isValidType(type: string): boolean;

  static addDatabaseType(type: string, store: OrbitDB.Store): void;

  static getDatabaseTypes(): {};

  static isValidAddress(address: string): boolean;
}

declare namespace OrbitDB {
  interface DBOptions {
    directory?: string;
    write?: string[];
    overwrite?: boolean;
    replicate?: boolean;
    type?: string;
    localOnly?: boolean;
    create?: boolean;
  }

  export class Store {

    address: { root: string, path: string };
    key: any;
    type: string;
    replicationStatus: { buffered: number, queued: number, progress: number, max: number };

    events: EventEmitter;

    constructor(ipfs: IPFS, identity: any, address: string, options: {});

    load(): Promise<void>;
    load(smount: number): Promise<void>;

    close(): Promise<void>;

    drop(): Promise<void>;
  }

  export class KeyValueStore<K, V> extends Store {

    put(key: K, value: V): Promise<void>;

    set(key: K, value: V): Promise<void>;

    get(key: K): V;

  }

  export class FeedStore<T> extends Store {
    add(data: any): Promise<string>;

    get(hash: string): T;

    remove(hash: string): Promise<string>;

    iterator(options?: {
      gt?: string,
      gte?: string,
      lt?: string,
      lte?: string,
      limit?: number,
      reverse?: boolean,
    }): {
      next(): { value: T, done: boolean },
      collect(): { payload: { value: T, done: boolean } }[],
    };
  }

  export class EventStore<T> extends Store {
    add(data: any): Promise<string>;

    get(hash: string): T;

    iterator(options?: {
      gt?: string,
      gte?: string,
      lt?: string,
      lte?: string,
      limit?: number,
      reverse?: boolean,
    }): {
      next(): { value: T, done: boolean },
      collect(): { payload: { value: T, done: boolean } }[],
    };
  }

  export class DocumentStore<T> extends Store {

    put(key: any, value: any): Promise<string>;

    get(key: any): T[];

    query(mapper: (doc: T) => void): T[];

    del(key: any): Promise<string>;

  }

  export class CounterStore extends Store {
    value: number;

    inc(value?: number): Promise<string>;
  }
}
