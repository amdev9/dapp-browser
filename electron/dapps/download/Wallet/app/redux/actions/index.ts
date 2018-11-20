import { action } from 'typesafe-actions';

import * as constants from '../constants';

export const onSubmitMainFormThunk = (roomName: string) => async (dispatch: any) => {
  // dispatch(setRoomName(roomName));
};

export const initApp = () => action(constants.INIT_APP);
