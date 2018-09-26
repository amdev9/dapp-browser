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

import "reflect-metadata";
import { createConnection } from "typeorm";
import { Store } from "./model/Store";

export default function SQLiteStorage() {
 
  const connection = async () => {

    console.log('connection')
    try { 
      let connection = await createConnection({
        "name": "default",
        "type": "sqlite",
        "database": "test.sqlite",
        "synchronize": true,
        "logging": true,
        "entities": [
          "./model/*.js"
        ],
      });
      return connection;
    } catch(error) {
      throw new Error('Unable to connect sqlite ' + error);
    }
  }

  const getRepository = async () => {
    console.log('getRepository')
    let conn  =  await connection();   
    return conn.getRepository(Store);
  }

  const setItem = async (key: string, value: string) => {   
    console.log('setItem')
    try {

      let repository = await getRepository();

      // setItem
      const objStore = await repository.findOne({
          key: key
      });
        if (objStore) {
          let project = await repository.update(objStore, {
              value: value
          });
          return project;
        } else {
          let insertedStore = await repository.save({
            key: key,
            value: value
          });
          return insertedStore.value;
        }
      } catch (error) {
        throw new Error('unable to set value ' + error);
      }
    }

  const getItem =  async (key: string) => {
    console.log('getItem')
    try {
      let repository = await getRepository();
      let item = await repository.findOne({ 
          where: {
            key: key
          } 
      });
      return item.value;
    } catch (error) {
      throw new Error('unable to get value ' + error);
    }
  }

  const removeItem = async (key: string) => {
     
    console.log('removeItem')
    try {
      let repository = await getRepository();
      const itemRemove = await repository.findOne({
          key: key
      });
      let project = await repository.remove(itemRemove);
          return project;
    } catch (error) {
      throw new Error('Unable to remove item' + error);
    }
  }


  const getAllKeys = async () => { 
    console.log('getAllKeys')
    try {
      let repository = await getRepository();
      let projects = await repository.find();
      const result = [];
      for( let i = 0, il = projects.length; i < il; i++) {
        result.push(projects[i].key);
      }
      return result;     
    } catch (error) {
      throw new Error('Unable to get all keys' + error);
    }      
  }

  const clear = async () => {
    console.log('clear')
    try {
      let repository = await getRepository();
      let projects = await repository.find();
      let project = await repository.remove(projects);
      return project;
    } catch (error) {
      throw new Error('Unable to destroy all data' + error);
    }      
  }

  return {
    getItem,
    setItem,
    removeItem,
    getAllKeys,
    clear
  };
}




  