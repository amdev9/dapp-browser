import { AnyAction } from 'redux';
import * as uuidv4 from 'uuid/v4';
import * as actions from '../redux/actions/channel';

type actionWrapper = (uid?: string, entry?: any, targetUUID?: string) => AnyAction;

export default class ArrayIO {
  store: any;
  emitter: any;

  constructor(store: any, emitter: any) {
    this.store = store;
    this.emitter = emitter;
  }

  handleUidPromise = (actionFlow: actionWrapper[], params?: any) => {
    const uid = uuidv4();
    return (resolve: any, reject: any) => {

      this.emitter.on(uid, function (action: AnyAction) {
        if (action.meta.uid === uid) {
          if (action.type === actionFlow[1]().type) {
            resolve(action.payload);
          } else if (action.type === actionFlow[2]().type) {
            reject(action.payload);
          }
        } else {
          console.log('Uid spoofing');
        }
      });
      this.store.dispatch(actionFlow[0](uid, params));
    };
  };

  openFileManager = async () => {
    return new Promise(
      this.handleUidPromise([
        actions.openFileManagerDialog,
        actions.openDialogSuccess,
        actions.openDialogFailure,
      ], []),
    );
  };

  networkGetBlock = async () => {
    return new Promise(
      this.handleUidPromise([
        actions.networkGetBlock,
        actions.getBlockSuccess,
        actions.getBlockFailure,
      ], []),
    );
  };

  networkSubscribe = async () => {
    return new Promise(
      this.handleUidPromise([
        actions.networkSubscribe,
        actions.networkSubscribeSuccess,
        actions.networkSubscribeFailure,
      ], []),
    );
  };

  networkUnsubscribe = async () => {
    return new Promise(
      this.handleUidPromise([
        actions.networkUnsubscribe,
        actions.networkUnsubscribeSuccess,
        actions.networkUnsubscribeFailure,
      ], []),
    );
  };

  writeToConsole = async (message: string) => {
    return new Promise(
      this.handleUidPromise([
        actions.writeToConsole,
        actions.loggerWriteSuccess,
        actions.loggerWriteFailure,
      ], [message]),
    );
  }

  keychainSign = async () => {
    return new Promise(
      this.handleUidPromise([
        actions.keychainSign,
        actions.keychainSignSuccess,
        actions.keychainSignFailure,
      ], []),
    );
  }

  storageSave = async (key: string, value: string) => {
    return new Promise(
      this.handleUidPromise([
        actions.storageSave,
        actions.storageSaveSuccess,
        actions.storageSaveFailure,
      ], { key, value }),
    );
  };

  storageFindAll = async () => {
    return new Promise(
      this.handleUidPromise([
        actions.storageFindAll,
        actions.storageFindAllSuccess,
        actions.storageFindAllFailure,
      ], []),
    );
  };

  storageRemove = async (key: string) => {
    return new Promise(
      this.handleUidPromise([
        actions.storageRemove,
        actions.storageRemoveSuccess,
        actions.storageRemoveFailure,
      ], { key }),
    );
  };
}
