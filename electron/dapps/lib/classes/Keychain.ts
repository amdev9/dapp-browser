import * as actions from '../redux/actions/channel';
import * as uuidv4 from 'uuid/v4';
import * as constants from '../redux/constants';

import StoreUIDSubscriber from './StoreUIDSubscriber';

export default class Keychain extends StoreUIDSubscriber {
  subscribePromise: Promise<any>;
  async sign(doSomething: Function) {
    console.log('Keychain sign start');
    const uid = uuidv4();

    this.subscribePromise = this.actionPromise(uid, {
      onStart: actions.keychainSign(),
      successType: constants.KEYCHAIN_SIGN_SUCCESS,
      failureType: constants.KEYCHAIN_SIGN_FAILURE,
    });

    const action: any = await this.subscribePromise;
    console.log('action: ', action);
    doSomething('doSomething three');
  }
}
