import { Message, RoomComponent, RoomComponentStore } from '../../services/RoomComponentService';
import * as actions from '../actions';
import { IState } from '../reducers';

export const onSubmitMainFormThunk = (roomId: string) => async (dispatch: any) => {
  dispatch(actions.selectRoom(roomId));

  actions.navigateToChat();

};

export const addRoomThunk = (roomName: string) => async (dispatch: any) => {
  if (RoomComponentStore.getRoomByName(roomName)) {
    throw new Error('Room already exist');
  }

  const room = await RoomComponent.create(roomName);
  room.on('message', (message: Message) => dispatch(actions.addRoomMessage(room.id, message)));
  RoomComponentStore.addRoom(room);

  dispatch(actions.addRoom(room.id, roomName));
  dispatch(actions.selectRoom(room.id));
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
  dispatch(actions.removeRoom(roomId));
  dispatch(actions.removeRoomMessages(roomId));

  room.leave();
  RoomComponentStore.removeRoom(roomId);
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
