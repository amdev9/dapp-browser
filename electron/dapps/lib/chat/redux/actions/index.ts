import { action } from 'typesafe-actions';
import { push } from 'react-router-redux';

import { Chat } from '../../../';
import * as constants from '../constants';

export const setRoomName = (roomName: string) =>
  action(constants.SET_ROOM_NAME, { roomName });

export const resetRoomName = () =>
  action(constants.RESET_ROOM_NAME);

export const navigateToMain = () => (dispatch: any) => {
  dispatch(push('/'));
}

export const navigateToChat = () => (dispatch: any) => {
  dispatch(push('/chat'));
}

export const onSubmitMainFormThunk = (roomName: string) => async (dispatch: any) => {
  dispatch(setRoomName(roomName));

  dispatch(navigateToChat());

};
