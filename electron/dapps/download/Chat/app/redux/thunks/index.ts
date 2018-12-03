import { formValueSelector } from 'redux-form';

import * as constants from '../constants';
import { Message, RoomComponent, RoomComponentStore } from '../../services/RoomComponentService';
import * as actions from '../actions';
import { IState } from '../reducers';
import * as selectors from '../selectors';
import * as events from '../events';

const ArrayIO = require('array-io');

export const onSubmitMainFormThunk = (roomId: string) => async (dispatch: any) => {
  dispatch(selectRoom(roomId));

  actions.navigateToChat();

};

export const addRoomThunk = (roomName: string) => async (dispatch: any, getState: any) => {
  const existedRoom = RoomComponentStore.getRoomByName(roomName);

  if (existedRoom) {
    throw new Error('Room already exist');
  }

  const room = await RoomComponent.create(roomName);
  room.on('message', (message: Message) => {
    const state: IState = getState();

    dispatch(addRoomMessage(room.id, message));
  });
  RoomComponentStore.addRoom(room);

  dispatch(actions.addRoom(room.id, roomName));
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
    dispatch(actions.deselectRoom());
  }
  room.leave();

  dispatch(actions.removeRoom(roomId));
  dispatch(actions.removeRoomMessages(roomId));

  RoomComponentStore.removeRoom(roomId);
  dispatch(updateFilterRoomListThunk());
};

export const updateFilterRoomListThunk = () => (dispatch: any, getState: any) => {
  const state = getState();

  const filterRoomsFormSelector = formValueSelector(constants.FORM_CHAT_ROOMS_SEARCH);

  const searchString: string = filterRoomsFormSelector(state, constants.FIELD_FORM_CHAT_ROOMS_SEARCH_STRING);
  dispatch(filterRoomListThunk(searchString));
};

export const filterRoomListThunk = (searchString: string) => (dispatch: any, getState: any) => {
  if (!searchString) {
    dispatch(actions.resetFilterRoomList());
  } else {
    const state: IState = getState();
    const filteredRoomList = state.rooms.roomList.filter((room) => room.roomName.includes(searchString));
    dispatch(actions.setFilteredRoomList(filteredRoomList));
  }
};

export const removeSelectedRoomThunk = () => (dispatch: any, getState: any) => {
  const state: IState = getState();

  if (state.rooms.selectedRoom) {
    dispatch(roomRemoveThunk(state.rooms.selectedRoom));
  }
};

export const selectRoom = (roomId: string) => (dispatch: any) => {
  const room = RoomComponentStore.getRoomById(roomId);

  if (!room) {
    return;
  }

  dispatch(actions.selectRoom(roomId));
  dispatch(setRoomUnreadMessages(roomId, 0));
  room.removeAllNotifications();
};

export const setRoomUnreadMessages = (roomId: string, counter: number) => (dispatch: any, getState: any) => {
  dispatch(actions.setRoomUnreadMessages(roomId, counter));

  const state: IState = getState();
  const unreadRoomsCounter = selectors.getAllRoomsUnreadMessagesCounter(state);
  events.setTrayCounter(unreadRoomsCounter);
};

export const addRoomMessage = (roomId: string, message: Message) => (dispatch: any, getState: any) => {
  const state: IState = getState();

  const room = RoomComponentStore.getRoomById(roomId);

  if (!room) {
    return;
  }

  if (state.rooms.selectedRoom !== roomId || !state.main.isDappFocused) {
    const roomUnreadMessagesCounter = selectors.getRoomUnreadMessagesCounter(roomId)(state) + 1;
    dispatch(setRoomUnreadMessages(roomId, roomUnreadMessagesCounter));

    if (!message.own) {
      room.showNotification({
        title: 'Chat',
        body: message.message,
      }, {
        onClick: () => dispatch(selectRoom(roomId)),
      });
    }
  }

  dispatch(actions.addRoomMessage(roomId, message));
};

export const setDappFocused = () => (dispatch: any, getState: any) => {
  const state: IState = getState();
  const selectedRoom = state.rooms.selectedRoom;

  dispatch(actions.setDappFocused());

  if (selectedRoom) {
    dispatch(selectRoom(selectedRoom));
  }

};
