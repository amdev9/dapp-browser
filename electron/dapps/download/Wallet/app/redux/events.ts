// import * as actions from './actions';
import * as constants from './constants';

const DappIO = require('dapp-io');

export const subscribeOnEvents = (store: any) => {
  DappIO.Dapp.on(constants.EVENT_OPEN_LINK, (payload: { params: string[] }) => {
    console.log('Wallet dapp: open link', payload.params);
    // const [roomName] = payload.params;

    // store.dispatch(actions.onSubmitMainFormThunk(roomName));
  });
};
