import { Message } from '../../services/RoomComponentService';
import * as constants from '../constants';

export interface MessagesState {
  messageList: { [roomId: string]: Message[] };
}

const initialState: MessagesState = {
  messageList: {},
};

export default (state: MessagesState = initialState, action: any) => {
  switch (action.type) {

    case constants.MESSAGES_ADD_ROOM_MESSAGE:
      const { roomId, message } = action.payload;

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

    case constants.MESSAGES_REMOVE_ROOM_MESSAGES:

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
