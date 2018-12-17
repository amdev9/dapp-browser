import * as mainActions from 'MainApp/modules/AppsManager/actions';
import * as mainConstants from 'MainApp/modules/AppsManager/constants';
import { DappDownloadEntity } from 'MainApp/modules/AppsManager/models';
import { component as StoreManager } from '../StoreManager';

export default class AppsManager {
  static async installDapp(dappName: string, hash: string): Promise<void> {
    await StoreManager.actionPromise({
      onStart: mainActions.onDappInstall(dappName, hash),
      successType: mainConstants.ON_DAPP_INSTALL_SUCCESS,
      failureType: mainConstants.ON_DAPP_INSTALL_FAILURE,
    });
  }

  static async getAllDapps(): Promise<DappDownloadEntity[]> {
    const action = await StoreManager.actionPromise({
      onStart: mainActions.getAllDapps(),
      successType: mainConstants.GET_ALL_DAPPS_SUCCESS,
      failureType: mainConstants.GET_ALL_DAPPS_FAILURE,
    });

    return action.payload && action.payload.dappsList;
  }
}
