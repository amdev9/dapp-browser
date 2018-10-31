import { action } from 'typesafe-actions';
import { push } from 'react-router-redux';


import { history } from '../store';
import * as constants from '../constants';

export const setRoomName = (roomName: string) =>
  action(constants.SET_ROOM_NAME, { roomName });

export const resetRoomName = () =>
  action(constants.RESET_ROOM_NAME);

export const navigateToMain = () => {
  history.push('/');
}

export const navigateToChat = () => {
  history.push('/chat');
}

export const onSubmitMainFormThunk = (roomName: string) => async (dispatch: any) => {
  dispatch(setRoomName(roomName));

  navigateToChat();

};
