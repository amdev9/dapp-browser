import * as thunks from './thunks';
import * as constants from './constants';
import * as events from './events';

const ArrayIO = require('array-io');

export default (store: any) => {
  ArrayIO.Dapp.on(constants.EVENT_OPEN_LINK, (payload: { params: string[] }) => {
    const [roomName] = payload.params;

    if (roomName) {
      store.dispatch(thunks.addRoomThunk(roomName));
    }
  });

  // Reset counter on app init
  events.setTrayCounter(0);

};
