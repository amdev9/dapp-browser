import { ignoreElements, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Epic } from 'redux-observable';
import { AnyAction } from 'redux';

export const storeObservable: Subject<AnyAction> = new Subject();

const appMainEpic: Epic<AnyAction> = action$ => action$.pipe(
  tap(action => storeObservable.next(action)),
  ignoreElements(),
);

export default appMainEpic;
