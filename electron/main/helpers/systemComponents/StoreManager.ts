import { AnyAction, Store } from 'redux';
import { ofType } from 'redux-observable';
import { filter } from 'rxjs/operators';

import { IState } from '../reducers/state';
import { storeObservable } from '../epics/appMainEpic';

export default class StoreManager {
  static store: Store<IState>;

  static onAction = (actionType: string, filterAction?: (action: AnyAction) => boolean): Promise<AnyAction> =>
    new Promise((resolve, reject) => {
      const subscriber = storeObservable
        .pipe(
          ofType(actionType),
          filter(action => filterAction ? filterAction(action) : !!action),
        )
        .subscribe((action) => {
          resolve(action);
          subscriber.unsubscribe();
        });
    })
}
