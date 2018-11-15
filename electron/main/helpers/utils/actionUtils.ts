import * as uuidv4 from 'uuid/v4';
import { AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import { filter } from 'rxjs/operators';
import { storeObservable } from '../epics/appMainEpic';
import ClientManager from "../ClientManager";

interface ActionFlow {
  successType: string;
  failureType: string;
  onStart?: AnyAction;
  uniqueAction?: boolean;
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

export const actionPromise = ({
                                onStart,
                                successType,
                                failureType,
                                uniqueAction,
                              }: ActionFlow, actionFilter?: (action: AnyAction) => boolean): Promise<AnyAction> => {
  if (!successType || !failureType) {
    return;
  }

  const uid = uuidv4();

  const copyAction = {
    ...onStart,
    meta: onStart.meta ? { ...onStart.meta, uid } : { uid },
  };

  const combineFilter = (action: AnyAction) => {
    if (actionFilter) {
      // If we want to filter identical actions we need to filter actions by uid
      // TODO: add unique filtering (uniqueAction ? action.meta.uid === uid : true)
      return actionFilter && actionFilter(action);
    }

    return true;
  };

  return new Promise((resolve, reject) => {
    const subscriber = storeObservable
      .pipe(
        ofType(successType, failureType),
        filter(combineFilter),
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
    // onStart && ClientManager.store.dispatch(onStart);
  });
};
