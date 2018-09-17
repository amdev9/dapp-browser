/**
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
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  key: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING
  }
});

const noop = () => {}

const DB_CLOSED_MESSAGE = 'Operation is not allowed when DB is closed!';

export default function SQLiteStorage() {

  const dbResolver = (() => {
    return new Promise((resolve, reject) => {
      sequelize
        .authenticate()
        .then(function (err) {
          console.log('Connection has been established successfully.');
          sequelize.sync({
              // force: true
            })
            .then(function (err) {
              console.log('It worked!');
              resolve();
            }, function (err) {
              console.log('An error occurred while creating the table:', err);
              reject();
            });
        }, function (err) {
          console.log('Unable to connect to the database:', err);
          reject(DB_CLOSED_MESSAGE);
        })
    });
  })();

  function getItem(key, cb = noop) {
    return new Promise((resolve, reject) => {
      dbResolver.then(() => {
        sequelize
          .authenticate()
          .then(function (err) {
            if (err) {
              cb(err);
              reject('unable to get value', err);
            }
            Store.findOne({
              where: {
                key: key
              }
            }).then(project => {
              resolve(project.value);
              cb(null, project.value);
            })
          }, function (err) {
            console.log('Unable to connect to the database:', err);
            reject(DB_CLOSED_MESSAGE);
          });
      });
    });
  }

  function setItem(key, value, cb = noop) {
    return new Promise((resolve, reject) => {
      dbResolver.then(() => {
        sequelize
          .authenticate()
          .then(function (err) {
            if (err) {
              cb(err);
              reject('unable to set value', err);
            }

            Store
              .findOne({
                where: {
                  key: key
                }
              })
              .then(function (objStore) {
                if (objStore) {
                  objStore.update({
                    value: value
                  }).then(project => {
                    resolve(project.value);
                  });
                } else {
                  Store.create({
                      key: key,
                      value: value
                    })
                    .then(function (insertedStore) {
                      resolve(insertedStore.value);
                    });
                }
              });
          }, function (err) {
            console.log('Unable to connect to the database:', err);
            reject(DB_CLOSED_MESSAGE);
          });
      });
    });
  }

  function removeItem(key, cb = noop) {
    return new Promise((resolve, reject) => {
      dbResolver.then(() => {
        sequelize
          .authenticate()
          .then(function (err) {
            if (err) {
              reject('unable to remove key', err);
              cb(err, 'unable to remove key');
            }
            Store.destroy({
              where: {
                key: key
              }
            }).then(project => {
              resolve(`${project} removed from store`);
              cb(null, `${project} removed from store`);
            });
          }, function (err) {
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
          .then(function (err) {
            if (err) {
              // cb(err);
              resolve([]);
              cb(null, []);
            }
            Store.findAll()
              .then(projects => {
                const result = [];
                for( let i = 0, il = projects.length; i < il; i++) {
                  result.push(projects[i].key);
                }
                resolve(result);
                cb(null, result);
              });
          }, function (err) {
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
          .then(function (err) {
            if (err) {
              reject(err);
              cb(err);
            }
            Store.destroy({
              where: {}
            }).then(project => {

              console.log(project);
              resolve(null);
              cb(null);
            });
          }, function (err) {
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