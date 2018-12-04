import * as actions from '../redux/actions/channel';
import * as constants from '../redux/constants';

import StoreSubscriber from './internal/StoreSubscriber';

export default class Keychain extends StoreSubscriber {
  subscribePromise: Promise<any>;

  async sign(transaction: string) {
    this.subscribePromise = this.actionPromise({
      onStart: actions.keychainSign(transaction),
      successType: constants.KEYCHAIN_SIGN_SUCCESS,
      failureType: constants.KEYCHAIN_SIGN_FAILURE,
    });

    const action: any = await this.subscribePromise;

    return action.payload;
  }

  async publicKey() {
    this.subscribePromise = this.actionPromise({
      onStart: actions.keychainPublicKey(),
      successType: constants.KEYCHAIN_PUBLIC_KEY_SUCCESS,
      failureType: constants.KEYCHAIN_PUBLIC_KEY_FAILURE,
    });

    const action: any = await this.subscribePromise;

    return action.payload;
  }
}
