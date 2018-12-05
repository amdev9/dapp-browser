import * as actions from '../redux/actions/channel';
import * as uuidv4 from 'uuid/v4';
import * as constants from '../redux/constants';

import StoreUIDSubscriber from './StoreUIDSubscriber';

export default class Ethereum extends StoreUIDSubscriber {
  subscribePromise: Promise<any>;

  async buildTransaction(to: string, value: number) {
    const uid = uuidv4();

    this.subscribePromise = this.actionPromise(uid, {
      onStart: actions.ethereumBuildTransaction(to, value),
      successType: constants.ETHEREUM_BUILD_TRANSACTION_SUCCESS,
      failureType: constants.ETHEREUM_BUILD_TRANSACTION_FAILURE,
    });

    const action: any = await this.subscribePromise;

    return action.payload;
  }
}
