import StoreSubscriber from './internal/StoreSubscriber';
import * as actions from '../redux/actions/channel';
import * as constants from '../redux/constants';
import { storeObservable } from '../redux/epics';
import { ofType } from 'redux-observable';

type NetworkSubscribeOptions = {
  onGetBlock: (block: any) => void;
};

class ArrayIO extends StoreSubscriber {
  networkGetBlock() {
    return this.actionPromise({
      onStart: actions.networkGetBlock(),
      successType: constants.NETWORK_GET_BLOCK_SUCCESS,
      failureType: constants.NETWORK_GET_BLOCK_FAILURE,
    });
  }

  async networkSubscribe(options: NetworkSubscribeOptions) {
    if (!options) {
      return;
    }

    const subscribeAction = await this.actionObservablePromise({
      onStart: actions.networkSubscribe(),
      successType: constants.NETWORK_SUBSCRIBE_SUCCESS,
      failureType: constants.NETWORK_SUBSCRIBE_FAILURE,
    });

    const getBlockUnsubscriber = this.subscribeObservableActions({
      actionTypes: [constants.NETWORK_BLOCK_CREATED],
      callback: (action) => {
        if (options.onGetBlock) {
          const block = JSON.parse(action.payload.block);
          options.onGetBlock(block);
        }
      }
    });

    return async () => {
      await this.networkUnsubscribe();
      getBlockUnsubscriber();
    };
  }

  networkUnsubscribe() {
    return this.actionObservablePromise({
      onStart: actions.networkUnsubscribe(),
      successType: constants.NETWORK_UNSUBSCRIBE_SUCCESS,
      failureType: constants.NETWORK_UNSUBSCRIBE_FAILURE,
    });
  }

  writeToConsole(message: string) {
    return this.actionPromise({
      onStart: actions.writeToConsole(message),
      successType: constants.LOGGER_WRITE_SUCCESS,
      failureType: constants.LOGGER_WRITE_FAILURE,
    });
  }
}

export default new ArrayIO();
