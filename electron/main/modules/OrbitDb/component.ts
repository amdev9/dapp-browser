import * as OrbitDB from 'orbit-db';
import { getReadyIpfsInstance } from '../../helpers/systemComponents/IpfsInstance';

const ORBIT_DB_PATH = './orbitdb';
const DEFAULT_DATABASE_TYPE = 'eventlog';

export interface OpenDatabaseOptions {
  directory?: string;
  onReplicated?: (entry: any) => void;
  onWrite?: (database: string, hash: string, entry: any) => void;
}

export interface CreateDatabaseOptions {
  type?: string;
  write?: string[];
}

export class OrbitDbClass {
  static async getOrbitDbInstance(options?: { directory?: string, peerId?: string }) {
    const ipfs = await getReadyIpfsInstance();

    return new OrbitDB(ipfs);
  }

  static async createDatabase(name: string, options: CreateDatabaseOptions = { write: ['*'], type: 'eventlog' }) {

    const ipfs = await getReadyIpfsInstance();
    const orbitdb = await OrbitDbClass.getOrbitDbInstance();

    return await orbitdb.create(name, options && options.type || DEFAULT_DATABASE_TYPE, options);
  }

  static async openDatabase(address: string, options?: OpenDatabaseOptions) {
    const orbitdb = await OrbitDbClass.getOrbitDbInstance();

    const db = await orbitdb.open(address, options);
    await db.load();

    return <OrbitDB.EventStore<any>> db;
  }

  static async onReplicated(address: string, callback: (entry: any) => void): Promise<void> {
    const db = await OrbitDbClass.openDatabase(address);

    db.events.on('replicated', callback);
  }

  static async onAdd(address: string, callback: (database: string, hash: string, entry: any) => void): Promise<void> {
    const db = await OrbitDbClass.openDatabase(address);

    db.events.on('write', callback);
  }

  static async addEntry(address: string, entry: any): Promise<string> {
    const db = await OrbitDbClass.openDatabase(address);

    return db.add(entry);
  }

  static async getEntry(address: string, hash: string): Promise<any> {
    const db = await OrbitDbClass.openDatabase(address);

    return db.get(hash);
  }

  static async getAllEntries(address: string): Promise<any[]> {
    const db = await OrbitDbClass.openDatabase(address);

    return db.iterator({ limit: -1 }).collect();
  }
}
