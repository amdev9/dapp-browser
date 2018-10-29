import { combineEpics, Epic, ofType, ActionsObservable } from 'redux-observable';
import { AnyAction } from 'redux';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import IpfsRoom from '../IpfsRoom';
import * as constants from '../constants';
import * as ipfsRoomActions from '../actions/ipfsRoom';

const ipfsRoomCreateThunk = (topic: string, sourceUUID: string) => async (dispatch: any) => {
  try {
    let room = IpfsRoom.get(sourceUUID, topic);

    if (!room) {
      room = await IpfsRoom.create(sourceUUID, topic);
      room.subscribe({
        onMessage: message => dispatch(ipfsRoomActions.ipfsRoomSendMessageToDapp(message, topic, sourceUUID)),
        onJoined: peer => dispatch(ipfsRoomActions.ipfsRoomPeerJoined(peer, sourceUUID)),
        onLeft: peer => dispatch(ipfsRoomActions.ipfsRoomPeerLeft(peer, sourceUUID)),
        onSubscribed: () => dispatch(ipfsRoomActions.ipfsRoomSubscribeSuccess(topic, sourceUUID)),
      });

    } else {
      dispatch(ipfsRoomActions.ipfsRoomSubscribeSuccess(topic, sourceUUID));
    }

  } catch (error) {
    dispatch(ipfsRoomActions.ipfsRoomSubscribeFailure(error, sourceUUID));
  }
};

const ipfsRoomsSubscribe = (action$: ActionsObservable<AnyAction>) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_ROOM_SUBSCRIBE),
  map((action) => ipfsRoomCreateThunk(action.payload.topic, action.meta.sourceUUID)),
);

const ipfsRoomSendBroadcastMessage: Epic<AnyAction> = (action$, state$) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST),
  switchMap(async (action) => {
    try {
      let room = IpfsRoom.get(action.meta.sourceUUID, action.payload.roomName);

      if (!room) {
        throw Error('Room has not exist');
      }

      await room.broadcast(action.payload.message);

      return ipfsRoomActions.ipfsRoomSendMessageBroadcastSuccess(action.payload.messageId, action.meta.sourceUUID);
    } catch (error) {
      return ipfsRoomActions.ipfsRoomSendMessageBroadcastFailure(error, action.payload.messageId, action.meta.sourceUUID);

    }
  }),
);

const ipfsRoomSendToPeerMessage: Epic<AnyAction> = (action$, state$) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER),
  switchMap(async (action) => {
    try {
      let room = IpfsRoom.get(action.meta.sourceUUID, action.payload.roomName);

      if (!room) {
        throw Error('Room has not exist');
      }

      await room.sendTo(action.payload.peer, action.payload.message);

      return ipfsRoomActions.ipfsRoomSendMessageToPeerSuccess(action.payload.messageId, action.meta.sourceUUID);
    } catch (error) {
      return ipfsRoomActions.ipfsRoomSendMessageToPeerFailure(error, action.payload.messageId, action.meta.sourceUUID);

    }
  }),
);

const ipfsRoomLeave: Epic<AnyAction> = (action$, state$) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_ROOM_LEAVE),
  switchMap(async (action) => {
    try {
      let room = IpfsRoom.get(action.meta.sourceUUID, action.payload.roomName);

      if (!room) {
        throw Error('Room has not exist');
      }

      await room.leave();

      return ipfsRoomActions.ipfsRoomLeaveSuccess(action.payload.roomName, action.meta.sourceUUID);
    } catch (error) {
      return ipfsRoomActions.ipfsRoomLeaveFailure(error, action.payload.roomName, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  ipfsRoomsSubscribe,
  ipfsRoomSendBroadcastMessage,
  ipfsRoomSendToPeerMessage,
  ipfsRoomLeave,
);
