import { AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import { filter } from 'rxjs/operators';
import { storeObservable } from '../epics/appMainEpic';

interface ActionFlow {
  successType: string;
  failureType: string;
}

export const onAction = (actionType: string, filterAction?: (action: AnyAction) => boolean): Promise<AnyAction> =>
  new Promise((resolve, reject) => {
    const subscriber = storeObservable
      .pipe(
        ofType(actionType),
        filter((action) => filterAction && filterAction(action) || !!action),
      )
      .subscribe((action) => {
        resolve(action);
        subscriber.unsubscribe();
      });
  });

export const actionPromise = ({ successType, failureType }: ActionFlow, actionFilter?: (action: AnyAction) => boolean): Promise<AnyAction> => {
  if (!successType || !failureType) {
    return;
  }

  return new Promise((resolve, reject) => {
    const subscriber = storeObservable
      .pipe(
        ofType(successType, failureType),
        filter((action) => actionFilter && actionFilter(action) || true),
      )
      .subscribe((action) => {
        if (successType) {
          resolve(action);
        }

        if (failureType) {
          reject(action);
        }
        subscriber.unsubscribe();
      });
  });
};
