import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const setRoomName = (roomName: string) =>
  action(constants.SET_ROOM_NAME, { roomName });

export const onSubmitMainFormThunk = (roomName: string) => async (dispatch: any) => {
  dispatch(setRoomName(roomName));
};

export const initApp = () => action(constants.INIT_APP);
