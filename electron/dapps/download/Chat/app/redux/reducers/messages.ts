import { Message } from '../../services/RoomStoreService';
import * as constants from '../constants';

export interface MessagesState {
  messageList: { [roomId: string]: Message[] };
}

const initialState: MessagesState = {
  messageList: {},
};

export default (state: MessagesState = initialState, action: any) => {
  switch (action.type) {

    case constants.ROOM_ADD_MESSAGE:
      const { roomId, message } = action.payload;
      console.log('adda', state.messageList, action.payload, state.messageList[action.payload.roomId])
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [roomId]: [
            ...(state.messageList[roomId] || []),
            message,
          ],
        },
      };

    case constants.ROOM_REMOVE_MESSAGES:

      return {
        ...state,
        messageList: {
          ...state.messageList,
          [action.payload.roomId]: null,
        },
      };


    default:
      return state;
  }
};
