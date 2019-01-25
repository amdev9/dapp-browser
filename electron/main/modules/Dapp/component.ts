import StoreManager from '../../helpers/systemComponents/StoreManager';
import * as actions from './actions';
import { globalUUIDList, RendererConf } from '../../helpers/constants/globalVariables';
import { activeDappSelector } from '../AppsManager/selectors';

export default class Dapp {
  renderer: RendererConf;

  constructor(dappRenderer: RendererConf) {
    this.renderer = dappRenderer;
  }

  static getDappByName(dappName: string): Dapp | null {
    if (!dappName) {
      return null;
    }

    const dappRenderer = globalUUIDList.find(dapp => dapp.name === dappName);
    return dappRenderer && dappRenderer.id && new Dapp(dappRenderer) || null;
  }

  static getDappById(dappId: string): Dapp | null {
    if (!dappId) {
      return null;
    }

    const dappRenderer = globalUUIDList.find(dapp => dapp.id === dappId && dapp.status === 'dapp');

    return dappRenderer && dappRenderer.id && new Dapp(dappRenderer) || null;
  }

  static getActiveDappName() {
    const state = StoreManager.store.getState();
    return activeDappSelector(state);
  }

  static getActiveDapp() {
    const activeDappName = Dapp.getActiveDappName();

    if (!activeDappName) {
      return;
    }

    return Dapp.getDappByName(activeDappName);
  }

  closeDapp(): void {
    this.renderer && this.renderer.dappView && this.renderer.dappView.destroy();
    const index = globalUUIDList.findIndex(item => item.id === this.renderer.id);

    if (!isNaN(index)) {
      globalUUIDList.splice(index, 1);
    }
  }

  get uuid() {
    return this.renderer.id;
  }

  get name() {
    return this.renderer.name;
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
