import * as constants from './constants';
import * as events from './events';
import * as actions from './actions';
import * as thunks from './thunks';

const ArrayIO = require('array-io');

export default (store: any) => {
  ArrayIO.Dapp.on(constants.EVENT_OPEN_LINK, (payload: { params: string[] }) => {
    const [roomName] = payload.params;

    if (roomName) {
      store.dispatch(thunks.addRoomThunk(roomName));
    }
  });

  ArrayIO.Dapp.on(constants.EVENT_DAPP_SET_FOCUS, () => {
    store.dispatch(thunks.setDappFocused());
  });

  ArrayIO.Dapp.on(constants.EVENT_DAPP_RESET_FOCUS, () => {
    store.dispatch(actions.resetDappFocused());
  });

  // Reset counter on app init
  events.setTrayCounter(0);

};
