import * as models from '../../redux/models';
import * as constants from '../constants';

export interface MessagesState {
  messageList: { [roomId: string]: models.MessageEntity[] };
}

const initialState: MessagesState = {
  messageList: {},
};

export default (state: MessagesState = initialState, action: any) => {
  switch (action.type) {

    case constants.MESSAGES_ADD_ROOM_MESSAGE: {
      const { roomId, entity } = action.payload;

      return {
        ...state,
        messageList: {
          ...state.messageList,
          [roomId]: [
            ...(state.messageList[roomId] || []),
            entity,
          ],
        },
      };
    }

    case constants.MESSAGES_REMOVE_ROOM_MESSAGES: {

      return {
        ...state,
        messageList: {
          ...state.messageList,
          [action.payload.roomId]: null,
        },
      };
    }

    case constants.MESSAGES_REMOVE_ROOM_MESSAGE: {
      const { roomId, messageId } = action.payload;

      return {
        ...state,
        messageList: {
          ...state.messageList,
          [roomId]: state.messageList[roomId] ? state.messageList[roomId].filter(msg => msg.id !== messageId) : null,
        },
      };
    }

    default:
      return state;
  }
};
