import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';

import FileManager from './component';
import * as fileManagerActions from './actions';
import * as constants from './constants';

const fileManagerOpenDialogEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.FILE_MANAGER_OPEN_DIALOG),
  mergeMap(async (action) => {
    try {
      const fileEntry = await FileManager.openFile();

      if (!fileEntry) {
        throw Error('File not selected');
      }

      return fileManagerActions.openDialogSuccess(fileEntry, action.meta.uid, action.meta.sourceUUID);
    } catch (error) {
      return fileManagerActions.openDialogFailure(error, action.meta.uid, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  fileManagerOpenDialogEpic,
);
