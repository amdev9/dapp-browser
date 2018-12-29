import { combineEpics, Epic, ofType, ActionsObservable } from 'redux-observable';
import { AnyAction } from 'redux';
import { of } from 'rxjs';
import { map, catchError, ignoreElements, tap, mergeMap } from 'rxjs/operators';

import Component from './component';
import * as constants from './constants';
import * as ipfsRoomActions from './actions';

const ipfsRoomCreateThunk = (topic: string, roomId: string, uid: string, sourceUUID: string) => async (dispatch: any) => {
  try {
    const room = Component.get(sourceUUID, roomId);
    const { id } = await room.getPeerId();

    room.subscribe({
      onMessage: message => dispatch(ipfsRoomActions.ipfsRoomSendMessageToDapp(message, topic, uid, sourceUUID)),
      onJoined: peer => dispatch(ipfsRoomActions.ipfsRoomPeerJoined(peer, uid, sourceUUID)),
      onLeft: peer => dispatch(ipfsRoomActions.ipfsRoomPeerLeft(peer, uid, sourceUUID)),
    });
    dispatch(ipfsRoomActions.ipfsRoomSubscribeSuccess(id, room.id, topic, uid, sourceUUID));

  } catch (error) {
    dispatch(ipfsRoomActions.ipfsRoomSubscribeFailure(error, sourceUUID, uid));
  }
};

const ipfsRoomsSubscribe = (action$: ActionsObservable<AnyAction>) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_ROOM_SUBSCRIBE),
  mergeMap(async (action) => {
    const sourceUUID = action.meta.sourceUUID;
    const uid = action.meta.uid;
    const topic = action.payload.topic;
    const roomId = action.payload.roomId;

    try {
      const room = await Component.create(action.meta.sourceUUID, action.payload.topic);

      return ipfsRoomCreateThunk(action.payload.topic, room.id, action.meta.uid, action.meta.sourceUUID);
    } catch (error) {
      throw ipfsRoomActions.ipfsRoomSubscribeFailure(error, sourceUUID, uid);
    }
  }),
  catchError(errorAction => of(errorAction)),
);

const ipfsRoomSendBroadcastMessage: Epic<AnyAction> = (action$, state$) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST),
  mergeMap(async (action) => {
    try {
      const room = Component.get(action.meta.sourceUUID, action.payload.roomId);

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
  mergeMap(async (action) => {
    try {
      let room = Component.get(action.meta.sourceUUID, action.payload.roomId);

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
  mergeMap(async (action) => {
    try {
      const room = Component.get(action.meta.sourceUUID, action.payload.roomId);

      if (!room) {
        throw Error('Room has not exist');
      }

      await room.leave();

      return ipfsRoomActions.ipfsRoomLeaveSuccess(action.payload.roomId, action.meta.sourceUUID);
    } catch (error) {
      return ipfsRoomActions.ipfsRoomLeaveFailure(error, action.payload.roomId, action.meta.sourceUUID);
    }
  }),
);

const ipfsRoomGetPeers: Epic<AnyAction> = (action$, state$) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_ROOM_GET_PEERS),
  mergeMap(async (action) => {
    try {
      const room = Component.get(action.meta.sourceUUID, action.payload.roomId);

      if (!room) {
        throw Error('Room has not exist');
      }

      const peerList = await room.getPeers();

      return ipfsRoomActions.ipfsRoomGetPeersSuccess(action.payload.roomId, peerList, action.meta.uid, action.meta.sourceUUID);
    } catch (error) {
      return ipfsRoomActions.ipfsRoomGetPeersFailure(error, action.payload.roomId, action.meta.uid, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  ipfsRoomsSubscribe,
  ipfsRoomSendBroadcastMessage,
  ipfsRoomSendToPeerMessage,
  ipfsRoomLeave,
  ipfsRoomGetPeers,
);
