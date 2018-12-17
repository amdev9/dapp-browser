import * as mainActions from 'MainApp/modules/AppsManager/actions';
import * as mainConstants from 'MainApp/modules/AppsManager/constants';
import { component as StoreManager } from '../StoreManager';

export default class AppsManager {
  static installDapp(dappName: string, hash: string) {
    StoreManager.store.dispatch(mainActions.onDappInstall(dappName, hash));
  }

  static getAllDapps() {
    return StoreManager.actionPromise({
      onStart: mainActions.getAllDapps(),
      successType: mainConstants.GET_ALL_DAPPS_SUCCESS,
      failureType: mainConstants.GET_ALL_DAPPS_FAILURE,
    });
  }
}
