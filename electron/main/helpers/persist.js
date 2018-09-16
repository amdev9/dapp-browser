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


//  MODELS
var Store = sequelize.define('store', {
  key: Sequelize.STRING,
  value: Sequelize.STRING
});


const noop = () => {}

const DB_CLOSED_MESSAGE = 'Operation is not allowed when DB is closed!';


export default function SQLiteStorage(SQLite = {}, config = {}) {
  const defaultConfig = {
    name: 'sqlite-storage',
    location: 'default'
  };

  const dbResolver = (() => {
    return new Promise((resolve, reject) => {

      sequelize
      .authenticate()
      .then(function(err) {
        console.log('Connection has been established successfully.');
        
        sequelize.sync({ force: true })
          .then(function(err) {
            console.log('It worked!');
          }, function (err) {
            console.log('An error occurred while creating the table:', err);
          })
          .then(() => Store.create({
            key: 'janedoe2',
            value: 'pass2'
          }))
          .then(jane => {
            console.log(jane.toJSON());
          });
      
      }, function (err) {
        console.log('Unable to connect to the database:', err);
      })
      
     
      // SQLite.openDatabase({...defaultConfig, ...`config`}, (db) => {
      //   db.transaction( tx => {
      //     tx.executeSql(`CREATE TABLE IF NOT EXISTS store (key, value)`);
      //   }, error => {
      //     console.warn('Unable to create table', error);
      //     reject();
      //   }, () => {
      //     resolve(db);
      //   });
      // }, error => {
      //   console.warn('Unable to open database', error)
      //   reject();
      // });
    });
  })();

  function getItem(key, cb = noop) {
    return new Promise((resolve, reject) => {
      sequelize
        .authenticate()
        .then(function(err) {
          Store.findOne({ 
            where: {
              key: 'janedoe'
            } 
          }).then(project => {
            resolve(project);
          })
        }, function (err) {
          console.log('Unable to connect to the database:', err);
          reject();
        });
        
     

      // dbResolver.then( db => {
      //   db.transaction((tx) => {
      //     tx.executeSql(
      //       'SELECT value FROM store WHERE key=?', [key],
      //       (tx, rs) => {
      //         resolve(rs.rows.item(0).value);
      //         cb(null, rs.rows.item(0).value);
      //       },
      //       (tx, err) => {
      //         cb(err);
      //         reject('unable to get value', err);
      //       }
      //     );
      //   });
      // }).catch(() => {
      //   reject(DB_CLOSED_MESSAGE);
      // });
    });
  }
  
  function setItem(key, value, cb = noop) {
    return new Promise((resolve, reject) => {

      sequelize
        .authenticate()
        .then(function(err) {
          Store.update({ 
            value: 'newPass'
          }, { where: { key: 'janedoe', id: 1 }}).then(project => {
            resolve(project);
          });
        }, function (err) {
          console.log('Unable to connect to the database:', err);
          reject();
        });
        

      

      // dbResolver.then( db => {
      //   db.transaction((tx) => {
      //     tx.executeSql(
      //       'SELECT count(*) as count FROM store WHERE key=?',
      //       [key],
      //       (tx, rs) => {
      //         if (rs.rows.item(0).count == 1) {
      //           tx.executeSql(
      //             'UPDATE store SET value=? WHERE key=?',
      //             [value, key],
      //             () => resolve(value),
      //             (tx, err) => reject('unable to set value', err)
      //           );
      //         } else {
      //           tx.executeSql(
      //             'INSERT INTO store VALUES (?,?)', [key, value],
      //             () => {
      //               resolve(value);
      //             },
      //             (tx, err) => {
      //               reject('unable to set value', err);
      //             }
      //           );
      //         }
      //       }
      //     );
      //   });
      // }).catch(() => {
      //   reject(DB_CLOSED_MESSAGE);
      // });
    });
  }
  
  function removeItem(key, cb = noop) {
    return new Promise((resolve, reject) => {

      sequelize
      .authenticate()
      .then(function(err) {
        Store.destroy({ 
          where: { 
            key: 'janedoe', id: 1 
          }
        }).then(project => {
          resolve(project);
        });
      }, function (err) {
        console.log('Unable to connect to the database:', err);
        reject();
      });

      

      // dbResolver.then( db => {
      //   db.transaction((tx) => {
      //     tx.executeSql(
      //       'DELETE FROM store WHERE key=?', [key],
      //       () => {
      //         resolve(`${key} removed from store`);
      //         cb(null, `${key} removed from store`);
      //       },
      //       (tx, err) => {
      //         reject('unable to remove key', err);
      //         cb(err, 'unable to remove key');
      //       }
      //     );
      //   });
      // }).catch(() => {
      //   reject(DB_CLOSED_MESSAGE);
      // });
    });
  }
  
  function getAllKeys(cb = noop) {
    return new Promise((resolve, reject) => {
      sequelize
        .authenticate()
        .then(function(err) {
          Store.findAll()
          .then(projects => {
            resolve(projects);
          });
        }, function (err) {
          console.log('Unable to connect to the database:', err);
          reject();
        });
      



      // dbResolver.then( db => {
      //   db.transaction((tx) => {
      //     tx.executeSql(
      //       'SELECT * FROM store', [],
      //       (tx, rs) => {
      //         const result = [];
      //         for( let i = 0, il = rs.rows.length; i < il; i++) {
      //           result.push(rs.rows.item(i).key);
      //         }
      //         resolve(result);
      //         cb(null, result);
      //       },
      //       (tx, err) => {
      //         resolve([]);
      //         cb(null, []);
      //       }
      //     );
      //   });
      // }).catch(() => {
      //   reject(DB_CLOSED_MESSAGE);
      // });
    });
  }

  function clear(cb = noop) {
    return new Promise((resolve, reject) => {
     
      sequelize
        .authenticate()
        .then(function(err) {    
          Store.destroy({ 
            where: { 
            }
          }).then(project => {
            resolve(project);
          });
        }, function (err) {
          console.log('Unable to connect to the database:', err);
          reject();
        });

        


      // dbResolver.then( db => {
      //   db.transaction(tx => {
      //     tx.executeSql('DELETE FROM store', [], () => {
      //       resolve(null);
      //       cb(null);
      //     }, (tx, err) => {
      //       reject(err);
      //       cb(err);
      //     });
      //   });
      // }).catch(() => {
      //   reject(DB_CLOSED_MESSAGE);
      // });
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

