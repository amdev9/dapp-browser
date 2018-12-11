import * as actions from '../redux/actions/channel';
import * as uuidv4 from 'uuid/v4';
import * as constants from '../redux/constants';

import StoreUIDSubscriber from './internal/StoreSubscriber';

export default class Logger extends StoreUIDSubscriber {
  subscribePromise: Promise<any>;

  async write(message: string) {
    const uid = uuidv4();

    this.subscribePromise = this.actionPromise({
      onStart: actions.writeToConsole(message),
      successType: constants.LOGGER_WRITE_SUCCESS,
      failureType: constants.LOGGER_WRITE_FAILURE,
    }, uid);

    const action: any = await this.subscribePromise;

    return action.payload;
  }
}
