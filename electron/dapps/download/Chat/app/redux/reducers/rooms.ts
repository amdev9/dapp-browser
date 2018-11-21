import * as constants from '../constants';

export interface Room {
  roomId: string;
  roomName: string;
  dateCreated: Date;
}

export interface RoomsState {
  selectedRoom: string | null;
  roomList: Room[];
  filteredRoomList: Room[] | null;
}

const initialState: RoomsState = {
  selectedRoom: null,
  roomList: [],
  filteredRoomList: null,
};

export default (state: RoomsState = initialState, action: any) => {
  switch (action.type) {

    case constants.ROOMS_ADD:
      return {
        ...state,
        roomList: [
          ...state.roomList,
          { ...action.payload },
        ],
      };

    case constants.ROOMS_REMOVE:
      return {
        ...state,
        roomList: state.roomList.filter((room: Room) => room.roomId !== action.payload.roomId),
      };

    case constants.ROOMS_SET_FILTERED_ROOMS_LIST:
      return {
        ...state,
        filteredRoomList: action.payload.roomList,
      }

    case constants.ROOMS_RESET_FILTERED_ROOMS_LIST:
      return {
        ...state,
        filteredRoomList: null,
      }

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
