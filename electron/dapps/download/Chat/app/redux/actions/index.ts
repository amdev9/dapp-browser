import { action } from 'typesafe-actions';

import history from '../history';
import * as constants from '../constants';
import { Message, RoomComponent, RoomComponentStore } from "../../services/RoomStoreService";
import { SubmissionError } from "redux-form";
import { IState } from "../reducers";
import { Room } from "../reducers/rooms";

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
    throw new Error('Room already exist');
  }

  const room = await RoomComponent.create(roomName);
  room.on('message', (message: Message) => dispatch(addRoomMessage(room.id, message)));
  RoomComponentStore.addRoom(room);

  dispatch(addRoom(room.id, roomName));
  dispatch(selectRoom(room.id));
};

export const roomRemoveThunk = (roomId: string) => (dispatch: any, getState: any) => {
  const state: IState = getState();
  const selectedRoom = state.rooms.selectedRoom;
  const room = RoomComponentStore.getRoomById(roomId);

  if (!room) {
    throw new Error('Room does not exist');
  }

  if (selectedRoom === roomId) {
    dispatch(deselectRoom());
  }
  dispatch(removeRoom(roomId));
  dispatch(removeRoomMessages(roomId));

  RoomComponentStore.removeRoom(roomId);
};

export const removeSelectedRoomThunk = () => (dispatch: any, getState: any) => {
  const state: IState = getState();

  if (state.rooms.selectedRoom) {
    dispatch(roomRemoveThunk(state.rooms.selectedRoom));
  }
};

export const addRoomMessage = (roomId: string, message: Message) =>
  action(constants.ROOM_ADD_MESSAGE, { roomId, message });

export const removeRoomMessages = (roomId: string) =>
  action(constants.ROOM_REMOVE_MESSAGES, roomId);

export const setFilteredRoomList = (roomList: Room[]) => action(constants.ROOM_SET_FILTERED_ROOM_LIST, { roomList });

export const filterRoomListThunk = (searchString: string) => (dispatch: any, getState: any) => {
  if (!searchString) {
    dispatch(resetFilterRoomList());
  } else {
    const state: IState = getState();
    const filteredRoomList = state.rooms.roomList.filter((room) => room.roomName.includes(searchString));
    dispatch(setFilteredRoomList(filteredRoomList));
  }
};

export const resetFilterRoomList = () => action(constants.ROOM_RESET_FILTERED_ROOM_LIST);
