import { emitter, store } from '../../redux/store';
import { AnyAction } from 'redux';
import * as uuid from 'uuid/v4';
import { storeObservable } from '../../redux/epics';
import { ofType } from 'redux-observable';
import { action } from 'typesafe-actions';

interface ActionFlow {
  onStart: AnyAction;
  successType: string;
  failureType: string;
  actionUid?: string;
}

interface SubscribeUIDActionsOptions {
  actionTypes: string | string[];
  uid: string;
  callback: (action: AnyAction) => void;
}

interface SubscribeObservableActions {
  actionTypes: string | string[];
  callback: (action: AnyAction) => void;
}

export default class StoreSubscriber {
  protected store: any;
  protected emitter: any;

  constructor() {
    this.store = store;
    this.emitter = emitter;
  }

  onUIDEvent(uid: string, callback: (action: any) => void): () => void {
    const listener = (action: AnyAction) => {
      if (action.meta.uid === uid) {
        callback(action);
      } else {
        console.log('Uid spoofing');
      }
    };
    this.emitter.on(uid, listener);

    return () => this.emitter.removeListener(uid, listener);
  }

  subscribeUIDActions(options: SubscribeUIDActionsOptions) {
    return this.onUIDEvent(options.uid, (action) => {
      if (options.actionTypes && [].concat(options.actionTypes).includes(action.type)) {
        options.callback(action);
      }
    });
  }

  subscribeObservableActions(options: SubscribeObservableActions) {
    const subscriber = storeObservable
      .pipe(ofType(...[].concat(options.actionTypes)))
      .subscribe(options.callback);

    return () => subscriber.unsubscribe();
  }

  actionObservablePromise({ onStart, successType, failureType }: ActionFlow, actionUid?: string): Promise<AnyAction> {
    if (!onStart || !successType || !failureType) {
      return;
    }

    const uid = actionUid || uuid();

    const copyAction = {
      ...onStart,
      meta: onStart.meta ? { ...onStart.meta, uid } : { uid },
    };

    return new Promise((resolve, reject) => {
      const unsubscribe = this.subscribeObservableActions({
        actionTypes: [successType, failureType],
        callback: (action: AnyAction) => {
          unsubscribe && unsubscribe();
          if (action.type === successType) {
            resolve(action);
          }

          if (action.type === failureType) {
            reject(action);
          }
        }
      });
      onStart && this.store.dispatch(copyAction);
    });
  }

  actionPromise({ onStart, successType, failureType }: ActionFlow, actionUid?: string): Promise<AnyAction> {
    if (!onStart || !successType || !failureType) {
      return;
    }

    const uid = actionUid || uuid();

    const copyAction = {
      ...onStart,
      meta: onStart.meta ? { ...onStart.meta, uid } : { uid },
    };

    return new Promise((resolve, reject) => {
      const unsubscribe = this.subscribeUIDActions({
        uid,
        actionTypes: [successType, failureType],
        callback: (action: AnyAction) => {
          unsubscribe && unsubscribe();
          if (action.type === successType) {
            resolve(action);
          }

          if (action.type === failureType) {
            reject(action);
          }
        }
      });
      onStart && this.store.dispatch(copyAction);
    });
  }
}
