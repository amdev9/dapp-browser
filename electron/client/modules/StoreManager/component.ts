import * as uuid from 'uuid/v4';
import { AnyAction } from 'redux';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs';

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

export default class StoreManager {
  static store: any;
  static emitter = new EventEmitter();
  static observable: Subject<AnyAction> = new Subject();

  static onUIDEvent(uid: string, callback: (action: any) => void): () => void {
    const listener = (action: AnyAction) => {
      if (action.meta.uid === uid) {
        callback(action);
      } else {
        console.log('Uid spoofing');
      }
    };
    StoreManager.emitter.on(uid, listener);

    return () => StoreManager.emitter.removeListener(uid, listener);
  }

  static subscribeUIDActions(options: SubscribeUIDActionsOptions) {
    return StoreManager.onUIDEvent(options.uid, (action) => {
      if (options.actionTypes && [].concat(options.actionTypes).includes(action.type)) {
        options.callback(action);
      }
    });
  }

  static actionPromise({ onStart, successType, failureType }: ActionFlow, actionUid?: string): Promise<AnyAction> {
    if (!onStart || !successType || !failureType) {
      return;
    }

    const uid = actionUid || uuid();

    const copyAction = {
      ...onStart,
      meta: onStart.meta ? { ...onStart.meta, uid } : { uid },
    };

    return new Promise((resolve, reject) => {
      const unsubscribe = StoreManager.subscribeUIDActions({
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
      onStart && StoreManager.store.dispatch(copyAction);
    });
  }
}
