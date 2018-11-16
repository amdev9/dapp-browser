import { action } from 'typesafe-actions';

import history from '../history';
import * as constants from '../constants/index';

export const setRoomName = (roomName: string) =>
  action(constants.SET_ROOM_NAME, { roomName });

export const resetRoomName = () =>
  action(constants.RESET_ROOM_NAME);

export const navigateToMain = () => {
  history.replace('/');
}

export const navigateToChat = () => {
  history.replace('/chat');
}

export const onSubmitMainFormThunk = (roomName: string) => async (dispatch: any) => {
  dispatch(setRoomName(roomName));

  navigateToChat();

};

export const initApp = () => action(constants.INIT_APP)
