import * as mainActions from 'MainApp/modules/Storage/actions';
import * as mainConstants from 'MainApp/modules/Storage/constants';
import StoreSubscriber from '../../classes/internal/StoreSubscriber';

export default class Storage extends StoreSubscriber {
  storageSave(key: string, value: string) {
    return this.actionPromise({
      onStart: mainActions.storageSave({ key, value }),
      successType: mainConstants.STORAGE_SAVE_SUCCESS,
      failureType: mainConstants.STORAGE_SAVE_FAILURE,
    });
  }

  storageFindAll() {
    return this.actionPromise({
      onStart: mainActions.storageFindAll(),
      successType: mainConstants.STORAGE_FIND_ALL_SUCCESS,
      failureType: mainConstants.STORAGE_FIND_ALL_FAILURE,
    });
  }

  storageRemove(key: string) {
    return this.actionPromise({
      onStart: mainActions.storageRemove(key),
      successType: mainConstants.STORAGE_REMOVE_SUCCESS,
      failureType: mainConstants.STORAGE_REMOVE_FAILURE,
    });
  }
}
