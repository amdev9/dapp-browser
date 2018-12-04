import { emitter, store } from '../../redux/store';
import { AnyAction } from 'redux';
import * as uuid from 'uuid/v4';

interface ActionFlow {
  onStart: AnyAction;
  successType: string;
  failureType: string;
}

export default class StoreUIDSubscriber {
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

  subscribeActions(actionTypes: string | string[], uid: string, callback: (action: AnyAction) => void) {
    return this.onUIDEvent(uid, (action) => {
      if (actionTypes && [].concat(actionTypes).includes(action.type)) {
        callback(action);
      }
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
      const unsubscribe = this.subscribeActions([successType, failureType], uid, (action: AnyAction) => {
        unsubscribe && unsubscribe();
        if (action.type === successType) {
          resolve(action);
        }

        if (action.type === failureType) {
          reject(action);
        }
      });
      onStart && this.store.dispatch(copyAction);
    });
  }
}
