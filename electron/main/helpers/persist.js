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
            }
            Store.findOne({
              where: {
                key: key
              }
            }).then(project => {
              resolve(project);
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
                    resolve(project);
                  });
                } else {
                  Store.create({
                      key: key,
                      value: value
                    })
                    .then(function (insertedStore) {
                      resolve(insertedStore);
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
              cb(err);
            }
            Store.destroy({
              where: {
                key: key
              }
            }).then(project => {
              resolve(project);
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
              cb(err);
            }
            Store.findAll()
              .then(projects => {
                resolve(projects);
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
              cb(err);
            }
            Store.destroy({
              where: {}
            }).then(project => {
              resolve(project);
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