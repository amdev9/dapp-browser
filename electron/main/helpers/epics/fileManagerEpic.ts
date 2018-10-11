import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { FileManager } from '../FileManager'
import * as fileManagerActions from '../actions/fileManager';
import * as constants from '../constants';
 
 
const fileManagerInstance = new FileManager();

const fileManagerOpenDialogEpic: Epic<AnyAction> = action$ => action$.pipe( //@todo fix action type
  ofType(constants.FILE_MANAGER_OPEN_DIALOG),
  switchMap(async (action) => {
    try {
      const idsArray = await fileManagerInstance.showOpenDialog()
      return fileManagerActions.openDialogSuccess(idsArray, action.meta.sourceUUID)
    } catch(error){
      return fileManagerActions.openDialogFailure(error, action.meta.sourceUUID)
    }
  }),
);

export default combineEpics(
  fileManagerOpenDialogEpic,
)
