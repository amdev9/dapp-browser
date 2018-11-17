import * as actions from './actions';
import * as constants from './constants';

const ArrayIO = require('array-io');

export const subscribeOnEvents = (store: any) => {
  ArrayIO.Dapp.on(constants.EVENT_OPEN_LINK, (payload: { params: string[] }) => {
    console.log('Chat dapp: open link', payload.params);
    const [roomName] = payload.params;

    store.dispatch(actions.onSubmitMainFormThunk(roomName));
  });
};
