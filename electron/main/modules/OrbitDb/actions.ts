import { action } from 'typesafe-actions';
import * as constants from './constants';

export const orbitDbOpenDatabase = (database: string) =>
  action(constants.ORBIT_DB_OPEN_DATABASE, { database });

export const orbitDbOpenDatabaseSuccess = (address: string, targetUUID?: string) =>
  action(constants.ORBIT_DB_OPEN_DATABASE_SUCCESS, { address }, { targetUUID });

export const orbitDbOpenDatabaseFailure = (error: string, targetUUID?: string) =>
  action(constants.ORBIT_DB_OPEN_DATABASE_FAILURE, { error }, { targetUUID });

export const orbitDbCreateDatabase = (database: string) =>
  action(constants.ORBIT_DB_CREATE_DATABASE, { database });

export const orbitDbCreateDatabaseSuccess = (database: string, targetUUID?: string) =>
  action(constants.ORBIT_DB_CREATE_DATABASE_SUCCESS, { database }, { targetUUID });

export const orbitDbCreateDatabaseFailure = (error: string, targetUUID?: string) =>
  action(constants.ORBIT_DB_CREATE_DATABASE_FAILURE, { error }, { targetUUID });

export const orbitDbGetEntry = (database: string, hash: string) =>
  action(constants.ORBIT_DB_GET_ENTRY, { database, hash });

export const orbitDbGetEntrySuccess = (hash: string, entry: any, targetUUID?: string) =>
  action(constants.ORBIT_DB_GET_ENTRY_SUCCESS, { hash, entry }, { targetUUID });

export const orbitDbGetEntryFailure = (hash: string, error: string, targetUUID?: string) =>
  action(constants.ORBIT_DB_GET_ENTRY_FAILURE, { hash, error }, { targetUUID });

export const orbitDbAddEntry = (database: string, entry: any) =>
  action(constants.ORBIT_DB_ADD_ENTRY, { database, entry });

export const orbitDbAddEntrySuccess = (hash: string, targetUUID?: string) =>
  action(constants.ORBIT_DB_ADD_ENTRY_SUCCESS, { hash }, { targetUUID });

export const orbitDbAddEntryFailure = (error: string, targetUUID?: string) =>
  action(constants.ORBIT_DB_ADD_ENTRY_FAILURE, { error }, { targetUUID });

export const orbitDbGetAllEntries = (database: string) =>
  action(constants.ORBIT_DB_GET_ALL_ENTRIES, { database });

export const orbitDbGetAllEntriesSuccess = (database: string, entries: any[], targetUUID?: string) =>
  action(constants.ORBIT_DB_GET_ALL_ENTRIES_SUCCESS, { database, entries }, { targetUUID });

export const orbitDbGetAllEntriesFailure = (error: string, targetUUID?: string) =>
  action(constants.ORBIT_DB_GET_ALL_ENTRIES_FAILURE, { error }, { targetUUID });
