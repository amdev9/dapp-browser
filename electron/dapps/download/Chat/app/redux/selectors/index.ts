import { createSelector } from 'reselect';
import { RoomComponentStore } from '../../services/RoomStoreService';
import { IState } from '../reducers';
import { Room } from "../reducers/rooms";

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
