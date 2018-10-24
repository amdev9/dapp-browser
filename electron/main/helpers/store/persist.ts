/*
 *
 * sequelize http://docs.sequelizejs.com/class/lib/model.js~Model.html
 *
 * SQLite store adaptor designed to use with redux-persist. This small piece of code can also be used
 * as an interface between application and SQLite storage. Functions signature are same as AsyncStorage.
 *
 * getItem(key);
 * setitem(key, value);
 * removeItem(key);
 * getAllKeys();
 * clear();
 *
 * All the method above returns Promise object.

*/

'use strict';

import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';
import { Store } from './model/Store';

export interface SQLiteStorageConfig {
  database: string;
  logging?: boolean;
  logger?: ConnectionOptions['logger'];
}

export default function SQLiteStorage(config?: SQLiteStorageConfig) {

  const storageEntity = Store;

  const dbConnection = createConnection({
    database: 'temp/sqliteStorage.db',
    type: 'sqlite',
    synchronize: true,
    ...config,
    entities: [storageEntity],
  });

  const getStoreRepository = async () => {
    const connection = await dbConnection;
    return connection.getRepository(storageEntity.name);
  };

  const getItem = async (key: string) => {
    try {
      const storeRepository = await getStoreRepository();
      const storeDb: any = await storeRepository.findOne(key);
      return storeDb && storeDb.value;

    } catch (e) {
      console.error(e);
    }
  };

  const setItem = async (key: string, item: string) => {
    try {
      const storeRepository = await getStoreRepository();
      const storeDb = new Store();

      storeDb.key = key;
      storeDb.value = item;

      return storeRepository.save(storeDb);

    } catch (e) {
      console.error(e);
    }
  };

  const removeItem = async (key: string) => {
    try {
      const storeRepository = await getStoreRepository();

      const storeToRemove = await storeRepository.findOne(key);

      return storeRepository.remove(storeToRemove);

    } catch (e) {
      console.error(e);
    }
  };

  const getAllKeys = async () => {
    try {
      const storeRepository = await getStoreRepository();

      const stories = await storeRepository.find();

      return stories.map((store: Store) => store.key);

    } catch (e) {
      console.error(e);
    }
  };

  const clear = async () => {
    try {
      const storeRepository = await getStoreRepository();

      const storiesToRemove = await storeRepository.find();

      const result = storeRepository.remove(storiesToRemove);

    } catch (e) {
      console.error(e);
    }

  };

  return {
    getItem,
    removeItem,
    setItem,
    clear,
    getAllKeys,
  };
}
