import StoreManager from '../../helpers/systemComponents/StoreManager';
import * as actions from './actions';
import { globalUUIDList } from '../../helpers/constants/globalVariables';
import { activeDappSelector } from '../AppsManager/selectors';

export default class Dapp {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }

  static getDappByName(dappName: string): Dapp {
    const dappRenderer = globalUUIDList.find(dapp => dapp.name === dappName);
    return dappRenderer && dappRenderer.id && new Dapp(dappRenderer.id) || null;
  }

  static getActiveDappName() {
    const state = StoreManager.store.getState();
    return activeDappSelector(state);
  }

  static getActiveDapp() {
    const activeDappName = Dapp.getActiveDappName();

    return Dapp.getDappByName(activeDappName);
  }

  setDappFocus() {
    StoreManager.store.dispatch(actions.dappSetFocus(this.uuid));
  }

  resetDappFocus() {
    StoreManager.store.dispatch(actions.dappResetFocus(this.uuid));
  }

  openLink(params: string[]) {
    StoreManager.store.dispatch(actions.dappActionOpenLink(params, this.uuid));
  }
}
