import { ofType, Epic, combineEpics } from 'redux-observable';
import { merge, concatMap, switchMap, map, tap } from 'rxjs/operators';

import * as constants from '../constants';
import { OrbitDbClass } from '../systemComponents/OrbitDb';
import * as orbitDbActions from '../actions/orbitDb';

const orbitCreateDatabaseThunk = (databaseName: string, sourceUUID: string) => async (dispatch: any) => {
  try {
    const database = await OrbitDbClass.createDatabase(databaseName);

    database.events.on('write', (database, entry) => {
      dispatch(orbitDbActions.orbitDbGetEntrySuccess(entry, sourceUUID));
    });

    return orbitDbActions.orbitDbCreateDatabaseSuccess(sourceUUID);
  } catch (error) {
    return orbitDbActions.orbitDbOpenDatabaseFailure(error, sourceUUID);
  }
};

const orbitOpenDatabaseThunk = (databaseName: string, sourceUUID: string) => async (dispatch: any) => {
  try {
    const database = await OrbitDbClass.openDatabase(databaseName);

    database.events.on('write', (database, entry) => {
      dispatch(orbitDbActions.orbitDbGetEntrySuccess(entry, sourceUUID));
    });

    return orbitDbActions.orbitDbCreateDatabaseSuccess(sourceUUID);
  } catch (error) {
    return orbitDbActions.orbitDbOpenDatabaseFailure(error, sourceUUID);
  }
};

const orbitCreateDb: Epic<any> = action$ => action$.pipe(
  ofType(constants.ORBIT_DB_CREATE_DATABASE),
  map(action => orbitCreateDatabaseThunk(action.payload.database, action.meta.sourceUUID)),
);

const orbitOpenDb: Epic<any> = action$ => action$.pipe(
  ofType(constants.ORBIT_DB_OPEN_DATABASE),
  map(action => orbitOpenDatabaseThunk(action.payload.database, action.meta.sourceUUID)),
);

const orbitAddEntry: Epic<any> = action$ => action$.pipe(
  ofType(constants.ORBIT_DB_ADD_ENTRY),
  switchMap(async (action) => {
    try {
      const hash = await OrbitDbClass.addEntry(action.payload.database, action.payload.entry);

      return orbitDbActions.orbitDbAddEntrySuccess(hash, action.meta.sourceUUID);
    } catch (error) {
      return orbitDbActions.orbitDbAddEntryFailure(error, action.meta.sourceUUID);
    }
  }),
);

const orbitGetEntry: Epic<any> = action$ => action$.pipe(
  ofType(constants.ORBIT_DB_GET_ENTRY),
  switchMap(async (action) => {
    try {
      const entry = await OrbitDbClass.getEntry(action.payload.database, action.payload.entry);

      return orbitDbActions.orbitDbGetEntrySuccess(entry.payload.value, action.meta.sourceUUID);
    } catch (error) {
      return orbitDbActions.orbitDbGetEntryFailure(error, action.meta.sourceUUID);
    }
  }),
);

const orbitGetAllEntries: Epic<any> = action$ => action$.pipe(
  ofType(constants.ORBIT_DB_GET_ALL_ENTRIES),
  switchMap(async (action) => {
    try {
      const entries = await OrbitDbClass.getAllEntries(action.payload.database);

      return orbitDbActions.orbitDbGetEntrySuccess(action.payload.database, entries, action.meta.sourceUUID);
    } catch (error) {
      return orbitDbActions.orbitDbGetEntryFailure(error, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  orbitCreateDb,
  orbitOpenDb,
  orbitAddEntry,
  orbitGetEntry,
  orbitGetAllEntries,
);
