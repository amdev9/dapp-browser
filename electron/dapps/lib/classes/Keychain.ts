import * as actions from '../redux/actions/channel';
import * as uuidv4 from 'uuid/v4';
import * as constants from '../redux/constants';

import StoreUIDSubscriber from './StoreUIDSubscriber';

export default class Keychain extends StoreUIDSubscriber {
  // async sign() {
  //   this.store.dispatch(actions.keychainSign(null, '', ''));
  // }

  async sign() {
    const messageId = uuidv4();
    return this.actionPromise(messageId, {
      onStart: actions.keychainSign(messageId), // , messageId
      successType: constants.KEYCHAIN_SIGN_SUCCESS,
      failureType: constants.KEYCHAIN_SIGN_FAILURE,
    });
  }
}
