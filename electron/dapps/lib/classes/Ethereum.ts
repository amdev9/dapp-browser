import * as actions from '../redux/actions/channel';
import * as uuidv4 from 'uuid/v4';
import * as constants from '../redux/constants';

import StoreUIDSubscriber from './internal/StoreSubscriber';

export default class Ethereum extends StoreUIDSubscriber {
  subscribePromise: Promise<any>;

  async buildTransaction(signature: string, from: string, to: string, value: number) {
    const uid = uuidv4();

    this.subscribePromise = this.actionPromise({
      onStart: actions.ethereumBuildTransaction(signature, from, to, value),
      successType: constants.ETHEREUM_BUILD_TRANSACTION_SUCCESS,
      failureType: constants.ETHEREUM_BUILD_TRANSACTION_FAILURE,
    }, uid);

    const action: any = await this.subscribePromise;

    return action.payload;
  }

  async publishTransaction(transaction: string) {
    const uid = uuidv4();

    this.subscribePromise = this.actionPromise({
      onStart: actions.ethereumPublishTransaction(transaction),
      successType: constants.ETHEREUM_PUBLISH_TRANSACTION_SUCCESS,
      failureType: constants.ETHEREUM_PUBLISH_TRANSACTION_FAILURE,
    }, uid);

    const action: any = await this.subscribePromise;

    return action.payload;
  }
}
