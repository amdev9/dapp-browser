import { Subject } from 'rxjs';
import { AnyAction } from 'redux';
import { combineEpics, ofType, Epic } from 'redux-observable';
import { mapTo, tap, ignoreElements } from 'rxjs/operators';

import * as actions from '../actions/channel';
import * as constants from '../constants';

export const storeObservable: Subject<AnyAction> = new Subject();

const appMainEpic: Epic<AnyAction> = action$ => action$.pipe(
  tap((action) => storeObservable.next(action)),
  ignoreElements(),
);

const toggleHome: Epic<any> = action$ => action$.pipe(
  ofType(constants.TOGGLE_HOME),
  mapTo(actions.networkUnsubscribe()),
);

export const rootEpic = combineEpics(
  appMainEpic,
  toggleHome,
);
