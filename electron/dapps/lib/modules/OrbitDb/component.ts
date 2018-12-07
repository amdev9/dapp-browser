import * as actions from 'MainApp/modules/OrbitDb/actions';
import * as constants from 'MainApp/modules/OrbitDb/constants';
import StoreSubscriber from '../../classes/internal/StoreSubscriber';

export default class OrbitDB extends StoreSubscriber {
  openDatabase(database: string) {
    return this.actionPromise({
      onStart: actions.orbitDbOpenDatabase(database),
      successType: constants.ORBIT_DB_OPEN_DATABASE_SUCCESS,
      failureType: constants.ORBIT_DB_OPEN_DATABASE_FAILURE,
    });
  }
  createDatabase(database: string) {
    return this.actionPromise({
      onStart: actions.orbitDbCreateDatabase(database),
      successType: constants.ORBIT_DB_CREATE_DATABASE_SUCCESS,
      failureType: constants.ORBIT_DB_CREATE_DATABASE_FAILURE,
    });
  }
  getEntry(database: string, hash: string) {
    return this.actionPromise({
      onStart: actions.orbitDbGetEntry(database, hash),
      successType: constants.ORBIT_DB_GET_ENTRY_SUCCESS,
      failureType: constants.ORBIT_DB_GET_ENTRY_FAILURE,
    });
  }
  addEntry(database: string, entry: any) {
    return this.actionPromise({
      onStart: actions.orbitDbAddEntry(database, JSON.stringify(entry)),
      successType: constants.ORBIT_DB_ADD_ENTRY_SUCCESS,
      failureType: constants.ORBIT_DB_ADD_ENTRY_FAILURE,
    });
  }
  getAllEntries(database: string) {
    return this.actionPromise({
      onStart: actions.orbitDbGetAllEntries(database),
      successType: constants.ORBIT_DB_GET_ALL_ENTRIES_SUCCESS,
      failureType: constants.ORBIT_DB_GET_ALL_ENTRIES_FAILURE,
    });
  }
}
