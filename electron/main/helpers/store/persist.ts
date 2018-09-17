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

var Sequelize = require('sequelize');

var sequelize = new Sequelize('mainDB', null, null, {
  dialect: "sqlite",
  storage: './test.sqlite',
});

var Store = sequelize.define('store', {
  key: Sequelize.STRING,
  value: Sequelize.STRING
});


const noop = (err: Error) => {}

const DB_CLOSED_MESSAGE = 'Operation is not allowed when DB is closed!';

export default function SQLiteStorage() {

  const dbResolver = (() => {
    return new Promise((resolve, reject) => {
      sequelize
      .authenticate()
      .then(function(err: any) {
        console.log('Connection has been established successfully.');
        sequelize.sync({ force: true })
          .then(function(err: any) {
            console.log('It worked!');
            resolve();
          }, function (err: any) {
            console.log('An error occurred while creating the table:', err);
            reject();
          });
      }, function (err: any) {
        console.log('Unable to connect to the database:', err);
        reject(DB_CLOSED_MESSAGE);
      })
    });
  })();

  function getItem(key: any, cb = noop) {
    return new Promise((resolve, reject) => {
      dbResolver.then(() => {
        sequelize
          .authenticate()
          .then(function(err: any) {
            if(err) { cb(err); }
            Store.findOne({ 
              where: {
                key: key
              } 
            }).then((project: any) => {
              resolve(project);
            })
          }, function (err: any) {
            console.log('Unable to connect to the database:', err);
            reject(DB_CLOSED_MESSAGE);
          });
      });
    });
  }
  
  function setItem(key: any, value: any, cb = noop) {
    return new Promise((resolve, reject) => {
      dbResolver.then(() => {
        sequelize
          .authenticate()
          .then(function(err: any) {
            if (err) { cb(err); }
            Store.update({ 
              value: value
            }, { where: { key: key }}).then((project: any) => {
              resolve(project);
            });
          }, function (err: any) {
            console.log('Unable to connect to the database:', err);
            reject(DB_CLOSED_MESSAGE);
          });
      });
    });
  }
  
  function removeItem(key: any, cb = noop) {
    return new Promise((resolve, reject) => {
      dbResolver.then(() => {
        sequelize
          .authenticate()
          .then(function(err: any) {
            if(err) { cb(err); }
            Store.destroy({ 
              where: { 
                key: key
              }
            }).then((project: any) => {
              resolve(project);
            });
          }, function (err: any) {
            console.log('Unable to connect to the database:', err);
            reject(DB_CLOSED_MESSAGE);
          });
      });
    });
  }
  
  function getAllKeys(cb = noop) {
    return new Promise((resolve, reject) => {
      dbResolver.then(() => {
        sequelize
          .authenticate()
          .then(function(err: any) {
            if(err) { cb(err); }
            Store.findAll()
            .then( (projects: any) => {
              resolve(projects);
            });
          }, function (err: any) {
            console.log('Unable to connect to the database:', err);
            reject(DB_CLOSED_MESSAGE);
          });
      });
    });
  }

  function clear(cb = noop) {
    return new Promise((resolve, reject) => {
      dbResolver.then(() => {
        sequelize
          .authenticate()
          .then(function(err: any) {  
            if(err) { cb(err); }  
            Store.destroy({ 
              where: {}
            }).then((project: any) => {
              resolve(project);
            });
          }, function (err: any) {
            console.log('Unable to connect to the database:', err);
            reject(DB_CLOSED_MESSAGE);
          });
      });
    });
  }

  return {
    getItem,
    setItem,
    removeItem,
    getAllKeys,
    clear
  };
};

