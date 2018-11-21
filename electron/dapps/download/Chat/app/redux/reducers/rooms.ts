import * as constants from '../constants';

export interface Room {
  roomId: string;
  roomName: string;
  dateCreated: Date;
}

export interface RoomsState {
  selectedRoom: string | null;
  roomList: { [roomId: string]: Room };
}

const initialState: RoomsState = {
  roomList: {},
  selectedRoom: null,
};

export default (state: RoomsState = initialState, action: any) => {
  switch (action.type) {

    case constants.ROOM_ADD:
      return {
        ...state,
        roomList: {
          ...state.roomList,
          [action.payload.roomId]: { ...action.payload },
        },
      };

    case constants.ROOM_REMOVE:
      return {
        ...state,
        roomList: {
          ...state.roomList,
          [action.payload.roomId]: null,
        },
      };

    case constants.SELECT_ROOM:
      return {
        ...state,
        selectedRoom: action.payload.roomId,
      };

    case constants.DESELECT_ROOM:
      return {
        ...state,
        selectedRoom: null,
      };

    default:
      return state;
  }
};
