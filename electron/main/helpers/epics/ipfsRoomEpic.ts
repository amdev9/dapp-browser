import * as Room from 'ipfs-pubsub-room'
import {combineEpics, Epic, ofType} from 'redux-observable'
import {AnyAction} from 'redux'
import { switchMap, map } from 'rxjs/operators';

import IpfsRoom from '../IpfsRoom'
import ipfsInstance from '../IpfsInstance'
import * as constants from '../constants'
import * as ipfsRoomActions from '../actions/ipfsRoom'

// const channel = 'my-channel_29923958f_848jjfjfd_030303'
//
// IpfsRoom.create(channel).then((room) => {
//   console.log('FIRST ROOM', room)
//   room.subscribe({
//     onMessage: (message) => console.log('onMessage', message.data.toString()),
//     onJoined: (peer) => console.log('onJoined', peer),
//     onLeft: (peer) => console.log('onLeft', peer),
//     onSubscribed: () => console.log('onSubscribed')
//   })
//
//   room.subscribe({
//     onJoined: (peer) => room.sendTo(peer, 'Hello ' + peer + '!')
//   })
// })
//
// setTimeout(() => {
//   IpfsRoom.create(channel).then((room) => {
//     room.subscribe({
//       onMessage: (message) => console.log('onMessage newRoom', message.data.toString()),
//       onJoined: (peer) => console.log('onJoined newRoom', peer),
//       onLeft: (peer) => console.log('onLeft newRoom', peer),
//       onSubscribed: () => console.log('onSubscribed newRoom')
//     })
//   })
// }, 10000)

const ipfsRoomCreateThunk = (topic: string, sourceUUID: string) => async (dispatch: any) => {
  try {
    let room = IpfsRoom.get(sourceUUID, topic);

    if (!room){
      room = await IpfsRoom.create(sourceUUID, topic);
      room.subscribe({
        onMessage: (message) => {
          console.log('onMessage', message, message.data.toString());
          dispatch(ipfsRoomActions.ipfsRoomSendMessage(message.data.toString(), topic, sourceUUID));
        },
        onJoined: (peer) => console.log('onJoined', peer),
        onLeft: (peer) => console.log('onLeft', peer),
        onSubscribed: () => dispatch(ipfsRoomActions.ipfsRoomSubscribeSuccess(topic, sourceUUID))
      })

    } else {
      dispatch(ipfsRoomActions.ipfsRoomSubscribeSuccess(topic, sourceUUID));
    }


  } catch (error) {
    dispatch(ipfsRoomActions.ipfsRoomSubscribeFailure(error, sourceUUID));
  }
};

const ipfsRoomsSubscribe: Epic<AnyAction> = (action$, state$) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_ROOM_SUBSCRIBE),
  map((action) => ipfsRoomCreateThunk(action.payload.topic, action.meta.sourceUUID)),
);

const ipfsSendToRoomMessage: Epic<AnyAction> = (action$, state$) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_ROOM_SEND_MESSAGE_TO_ROOM),
  switchMap(async (action) => {
    try {
      let room = IpfsRoom.get(action.meta.sourceUUID, action.payload.roomName);

      console.log('IPFS_ROOM_SEND_MESSAGE_TO_ROOM', action, !!room);

      if (!room){
        throw Error('Room has not exist');
      }

      await room.broadcast(action.payload.message);

      return { type: 'ipfsSendToRoomMessageEpicSuccess'}

    } catch (error) {
      return { type: 'ipfsSendToRoomMessageEpicError', payload: error}

    }
  }),
);

export default combineEpics(
  ipfsRoomsSubscribe,
  ipfsSendToRoomMessage,
)
