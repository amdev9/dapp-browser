import * as constants from './constants';
import * as events from './events';
import * as actions from './actions';
import * as thunks from './thunks';

const DappIO = require('dapp-io');

export default (store: any) => {
  DappIO.Dapp.on(constants.EVENT_OPEN_LINK, (payload: { params: string[] }) => {
    const [roomName] = payload.params;

    if (roomName) {
      store.dispatch(thunks.addRoomThunk(roomName));
    }
  });

  DappIO.Dapp.on(constants.EVENT_DAPP_SET_FOCUS, () => {
    store.dispatch(thunks.setDappFocused());
  });

  DappIO.Dapp.on(constants.EVENT_DAPP_RESET_FOCUS, () => {
    store.dispatch(actions.resetDappFocused());
  });

  // Reset counter on app init
  events.setTrayCounter(0);

};
