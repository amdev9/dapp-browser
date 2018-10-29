import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const orbitDbOpenDatabase = (address: string, targetUUID? :string) =>
  action(constants.ORBIT_DB_OPEN_DATABASE_SUCCESS, { address }, { targetUUID });

export const orbitDbOpenDatabaseSuccess = (address: string, targetUUID? :string) =>
  action(constants.ORBIT_DB_OPEN_DATABASE_SUCCESS, { address }, { targetUUID });

export const orbitDbOpenDatabaseFailure = (error: string, targetUUID? :string) =>
  action(constants.ORBIT_DB_OPEN_DATABASE_FAILURE, { error }, { targetUUID });

export const orbitDbCreateDatabase = (name: string, targetUUID? :string) =>
  action(constants.ORBIT_DB_CREATE_DATABASE, { name }, { targetUUID });

export const orbitDbCreateDatabaseSuccess = (database: string, targetUUID? :string) =>
  action(constants.ORBIT_DB_CREATE_DATABASE_SUCCESS, { database }, { targetUUID });

export const orbitDbCreateDatabaseFailure = (error: string, targetUUID? :string) =>
  action(constants.ORBIT_DB_CREATE_DATABASE_FAILURE, { error }, { targetUUID });

export const orbitDbGetEntry = (hash: string, targetUUID? :string) =>
  action(constants.ORBIT_DB_GET_ENTRY, { hash }, { targetUUID });

export const orbitDbGetEntrySuccess = (hash: string, entry: any, targetUUID? :string) =>
  action(constants.ORBIT_DB_GET_ENTRY_SUCCESS, { hash, entry }, { targetUUID });

export const orbitDbGetEntryFailure = (hash: string, error: string, targetUUID? :string) =>
  action(constants.ORBIT_DB_GET_ENTRY_FAILURE, { hash, error }, { targetUUID });

export const orbitDbAddEntry = (database: string, entry: any, targetUUID? :string) =>
  action(constants.ORBIT_DB_ADD_ENTRY, { database, entry }, { targetUUID });

export const orbitDbAddEntrySuccess = (hash: string, targetUUID? :string) =>
  action(constants.ORBIT_DB_ADD_ENTRY_SUCCESS, { hash }, { targetUUID });

export const orbitDbAddEntryFailure = (error: string, targetUUID? :string) =>
  action(constants.ORBIT_DB_ADD_ENTRY_FAILURE, { error }, { targetUUID });

export const orbitDbGetAllEntries = (database: string, entry: any, targetUUID? :string) =>
  action(constants.ORBIT_DB_GET_ALL_ENTRIES, { database, entry }, { targetUUID });

export const orbitDbGetAllEntriesSuccess = (database: string, entries: any[], targetUUID? :string) =>
  action(constants.ORBIT_DB_GET_ALL_ENTRIES_SUCCESS, { database, entries }, { targetUUID });

export const orbitDbGetAllEntriesFailure = (error: string, targetUUID? :string) =>
  action(constants.ORBIT_DB_GET_ALL_ENTRIES_FAILURE, { error }, { targetUUID });
