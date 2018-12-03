import { AnyAction } from 'redux';
import * as uuidv4 from 'uuid/v4';

import * as actions from '../redux/actions/channel';
import StoreUIDSubscriber from './internal/StoreUIDSubscriber';
import * as constants from '../redux/constants';

export default class ArrayIO extends StoreUIDSubscriber {
  openFileManager() {
    return this.actionPromise({
      onStart: actions.openFileManagerDialog(),
      successType: constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS,
      failureType: constants.FILE_MANAGER_OPEN_DIALOG_FAILURE,
    });
  }

  networkGetBlock() {
    return this.actionPromise({
      onStart: actions.networkGetBlock(),
      successType: constants.NETWORK_GET_BLOCK_SUCCESS,
      failureType: constants.NETWORK_GET_BLOCK_FAILURE,
    });
  }

  networkSubscribe() {
    return this.actionPromise({
      onStart: actions.networkSubscribe(),
      successType: constants.NETWORK_SUBSCRIBE_SUCCESS,
      failureType: constants.NETWORK_SUBSCRIBE_FAILURE,
    });
  }

  networkUnsubscribe() {
    return this.actionPromise({
      onStart: actions.networkUnsubscribe(),
      successType: constants.NETWORK_UNSUBSCRIBE_SUCCESS,
      failureType: constants.NETWORK_UNSUBSCRIBE_FAILURE,
    });
  }

  writeToConsole(message: string) {
    return this.actionPromise({
      onStart: actions.writeToConsole(message),
      successType: constants.LOGGER_WRITE_SUCCESS,
      failureType: constants.LOGGER_WRITE_FAILURE,
    });
  }

  storageSave(key: string, value: string) {
    return this.actionPromise({
      onStart: actions.storageSave({ key, value }),
      successType: constants.STORAGE_SAVE_SUCCESS,
      failureType: constants.STORAGE_SAVE_FAILURE,
    });
  }

  storageFindAll() {
    return this.actionPromise({
      onStart: actions.storageFindAll(),
      successType: constants.STORAGE_FIND_ALL_SUCCESS,
      failureType: constants.STORAGE_FIND_ALL_FAILURE,
    });
  }

  storageRemove(key: string) {
    return this.actionPromise({
      onStart: actions.storageRemove(key),
      successType: constants.STORAGE_REMOVE_SUCCESS,
      failureType: constants.STORAGE_REMOVE_FAILURE,
    });
  }
}
