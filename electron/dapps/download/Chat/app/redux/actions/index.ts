import { action } from 'typesafe-actions';

import history from '../history';
import * as constants from '../constants';
import { Message, RoomComponent, RoomComponentStore } from "../../services/RoomStoreService";
import { SubmissionError } from "redux-form";

export const deselectRoom = () =>
  action(constants.DESELECT_ROOM);

export const selectRoom = (roomId: string) =>
  action(constants.SELECT_ROOM, { roomId });

export const navigateToMain = () => {
  history.replace('/');
};

export const navigateToChat = () => {
  history.replace('/chat');
};

export const onSubmitMainFormThunk = (roomId: string) => async (dispatch: any) => {
  dispatch(selectRoom(roomId));

  navigateToChat();

};

export const initApp = () => action(constants.INIT_APP);

export const setSearchRoomString = (roomName: string) => action(constants.SET_ROOM_SEARCH_STRING, { roomName });

export const addRoom = (roomId: string, roomName: string) =>
  action(constants.ROOM_ADD, { roomId, roomName, dateCreated: new Date() });

export const removeRoom = (roomId: string) =>
  action(constants.ROOM_REMOVE, { roomId });

export const addRoomThunk = (roomName: string) => async (dispatch: any) => {
  if (RoomComponentStore.getRoomByName(roomName)) {
    throw new Error('Room already exist')
  }

  const room = await RoomComponent.create(roomName);
  room.on('message', (message: Message) => dispatch(addRoomMessage(room.id, message)))
  RoomComponentStore.addRoom(room);

  dispatch(addRoom(room.id, roomName));
  dispatch(selectRoom(room.id));
}

export const roomRemoveThunk = (roomId: string) => (dispatch: any) => {
  dispatch(removeRoom(roomId));
  dispatch(removeRoomMessages(roomId));
};

export const addRoomMessage = (roomId: string, message: Message) =>
  action(constants.ROOM_ADD_MESSAGE, { roomId, message });

export const removeRoomMessages = (roomId: string) =>
  action(constants.ROOM_REMOVE_MESSAGES, roomId);
