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
import {createConnection, ConnectionOptions} from 'typeorm';
import { Story } from './model/Story';

export interface SQLiteStorageConfig {
  database: string;
  logging?: boolean;
  logger?: ConnectionOptions['logger'];
}

export default function SQLiteStorage(config?: SQLiteStorageConfig) {

  const storageEntity = Story;

  const dbConnection = createConnection({
    database: 'temp/sqliteStorage.db',
    type: 'sqlite',
    synchronize: true,
    ...config,
    entities: [storageEntity],
  });

  const getItem = async (key: string) => {
    try {
      const connection = await dbConnection;

      const storyRepository = connection.getRepository(storageEntity.name);

      const story: any = await storyRepository.findOne(key);

      return story && story.value

    } catch (e) {
      console.error(e)
    }
  }

  const setItem = async (key: string, item: string) => {
    try {
      const connection = await dbConnection;

      const storyRepository = connection.getRepository(storageEntity.name);

      const story = new Story();

      story.key = key;
      story.value = item;

      return storyRepository.save(story)

    } catch (e) {
      console.error(e)
    }
  };

  const removeItem = async (key: string) => {
    try {
      const connection = await dbConnection;

      const storyRepository = connection.getRepository(storageEntity.name);

      const storyToRemove = await storyRepository.findOne(key);

      return storyRepository.remove(storyToRemove)

    } catch (e) {
      console.error(e)
    }
  };

  const getAllKeys = async () => {
    try {
      const connection = await dbConnection;

      const storyRepository = connection.getRepository(storageEntity.name);

      const stories = await storyRepository.find();

      return stories.map((story: Story) => story.key)

    } catch (e) {
      console.error(e)
    }
  };

  const clear = async () => {
    try {
      const connection = await dbConnection;

      const storyRepository = connection.getRepository(storageEntity.name);

      const storiesToRemove = await storyRepository.find();

      const result = storyRepository.remove(storiesToRemove)

    } catch (e) {
      console.error(e)
    }

  };

  return {
    getItem,
    removeItem,
    setItem,
    clear,
    getAllKeys
  }
}



