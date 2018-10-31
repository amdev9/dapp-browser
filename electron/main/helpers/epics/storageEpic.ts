import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import * as storageActions  from '../actions/storage';
import * as constants from '../constants';
import { Storage } from '../Storage';

const storageSaveEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.STORAGE_SAVE),
  switchMap(async (action) => {
    try {
      const key = action.payload.key;
      const value = action.payload.value;

      const storage = new Storage(action.meta.sourceUUID);
      await storage.save(key, value);

      return storageActions.saveSuccess({ key, value });
    } catch (error) {
      return storageActions.saveFailure(error, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  storageSaveEpic,
);
