import clientActions from 'MainApp/modules/AppsManager/actions';
import { component as StoreManager } from '../StoreManager';

export default class AppsManager {
  static installDapp(dappName: string, hash: string) {
    StoreManager.store.dispatch(clientActions.onDappInstall(dappName, hash));
  }
}
