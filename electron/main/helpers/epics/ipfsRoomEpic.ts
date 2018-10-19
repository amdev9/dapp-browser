import * as Room from 'ipfs-pubsub-room'
import {combineEpics, Epic, ofType} from 'redux-observable'
import {AnyAction} from 'redux'
import {switchMap} from 'rxjs/operators';

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



const ipfsRoomsSubscribe: Epic<AnyAction> = (action$, state$) => action$.pipe( //@todo fix action type
  ofType(constants.IPFS_ROOM_SUBSCRIBE),
  switchMap(async (action) => {
    try {
      const room = await IpfsRoom.create(action.payload.topic)
      room.subscribe({
        onMessage: (message) => console.log('onMessage', message.data.toString()),
        onJoined: (peer) => console.log('onJoined', peer),
        onLeft: (peer) => console.log('onLeft', peer),
        onSubscribed: () => console.log('onSubscribed')
      })

      return ipfsRoomActions.ipfsRoomSubscribeSuccess(action.meta.sourceUUID)
    } catch(error){
      return ipfsRoomActions.ipfsRoomSubscribeFailure(error, action.meta.sourceUUID)
    }
  }),
);

export default combineEpics(
  ipfsRoomsSubscribe,
)
