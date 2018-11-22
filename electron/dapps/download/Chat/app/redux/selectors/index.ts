import { createSelector } from 'reselect';
import { RoomComponentStore } from '../../services/RoomComponentService';
import { IState } from '../reducers';
import { Room } from '../reducers/rooms';

export const getSelectedRoomNameSelector = createSelector(
  (state: IState) => state.rooms.selectedRoom,
  (roomId: string) => {
    const room = RoomComponentStore.getRoomById(roomId);
    return room && room.roomName || '';
  }
);

export const getSelectedRoomMessages = createSelector(
  (state: IState) => state.messages.messageList,
  (state: IState) => state.rooms.selectedRoom,
  (messageList, selectedRoom) => selectedRoom && messageList[selectedRoom] || []
);

export const getRoomById = (roomId: string) => createSelector(
  (state: IState) => state.rooms.roomList,
  (roomList) => roomList.find((room) => room.roomId === roomId),
);

export const getRoomUnreadMessagesCounter = (roomId: string) => createSelector(
  getRoomById(roomId),
  (room: Room) => room && room.unreadMessagesCount || 0,
);

export const getAllRoomsUnreadMessagesCounter = createSelector(
  (state: IState) => state.rooms.roomList,
  (roomList) => roomList.reduce((acc, room) => (room.unreadMessagesCount || 0) + acc, 0)
);
