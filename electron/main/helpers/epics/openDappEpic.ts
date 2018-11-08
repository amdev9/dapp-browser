import { of } from 'rxjs';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { merge, concatMap } from 'rxjs/operators';
import * as constants from '../constants';
import {  AppsManager } from '../AppsManager';
import { addAppItem, switchDapp } from '../actions/client';

const openDappEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.TOGGLE_APP_HOME), // @todo get appName from payload
  concatMap((action: any) => of(
    addAppItem(AppsManager.getAppItem(action.payload.targetDappName)),
    )
      .pipe(
        merge(
          of(
            switchDapp(action.payload.targetDappName),
          ),
        ),
      ),
  ),
);

export default combineEpics(
  openDappEpic,
);
