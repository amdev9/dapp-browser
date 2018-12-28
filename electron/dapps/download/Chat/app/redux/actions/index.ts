import { action } from 'typesafe-actions';

import history from '../history';
import * as constants from '../constants';
import { Message } from '../../services/RoomComponentService';
import { Room } from '../reducers/rooms';

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

export const addRoom = (roomId: string, roomName: string) =>
  action(constants.ROOMS_ADD, { roomId, roomName, dateCreated: new Date() });

export const removeRoom = (roomId: string) =>
  action(constants.ROOMS_REMOVE, { roomId });

export const addRoomMessage = (roomId: string, message: Message) =>
  action(constants.MESSAGES_ADD_ROOM_MESSAGE, { roomId, message });

export const removeRoomMessages = (roomId: string) =>
  action(constants.MESSAGES_REMOVE_ROOM_MESSAGES, { roomId });

export const setFilteredRoomList = (roomList: Room[]) => action(constants.ROOMS_SET_FILTERED_ROOMS_LIST, { roomList });

export const resetFilterRoomList = () => action(constants.ROOMS_RESET_FILTERED_ROOMS_LIST);

export const setRoomUnreadMessages = (roomId: string, counter: number) =>
  action(constants.ROOM_SET_UNREAD_MESSAGES, { roomId, counter });

export const setDappFocused = () =>
  action(constants.MAIN_SET_DAPP_FOCUSED);

export const resetDappFocused = () =>
  action(constants.MAIN_RESET_DAPP_FOCUSED);

export const onClickFileAttach = () =>
  action(constants.ROOMS_ON_CLICK_FILE_ATTACH)
