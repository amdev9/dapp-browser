import { action } from 'typesafe-actions';

import * as constants from '../constants';
import { Message } from '../systemComponents/IpfsRoom';

export const ipfsRoomSubscribe = (topic: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SUBSCRIBE, { topic }, { targetUUID })

export const ipfsRoomSubscribeSuccess = (peerId: string, roomId: string, topic: string, uid: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SUBSCRIBE_SUCCESS, { peerId, topic, roomId }, { uid, targetUUID })

export const ipfsRoomSubscribeFailure = (error: string, targetUUID: string, uid: string) =>
  action(constants.IPFS_ROOM_SUBSCRIBE_FAILURE, { error }, { targetUUID, uid })

export const ipfsRoomSendMessageToDapp = (message: Message, roomId: string, uid: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_DAPP, { message, roomId }, { uid, targetUUID })

export const ipfsRoomSendMessageBroadcast = (messageId: string, message: string | Buffer, roomId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST, { messageId, message, roomId }, { targetUUID })

export const ipfsRoomSendMessageBroadcastSuccess = (messageId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_SUCCESS, { messageId }, {  targetUUID, uid: messageId })

export const ipfsRoomSendMessageBroadcastFailure = (error: string, messageId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_FAILURE, { error, messageId }, { targetUUID })

export const ipfsRoomSendMessageToPeer = (messageId: string, message: string | Buffer, roomId: string, peer: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER, { message, messageId, roomId, peer }, { targetUUID, uid: messageId })

export const ipfsRoomSendMessageToPeerSuccess = (messageId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_SUCCESS, { messageId })

export const ipfsRoomSendMessageToPeerFailure = (error: string, messageId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_FAILURE, { error, messageId }, { targetUUID })

export const ipfsRoomPeerJoined = (peer: string, uid: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_PEER_JOINED, { peer }, { uid, targetUUID })

export const ipfsRoomPeerLeft = (peer: string, uid: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_PEER_LEFT, { peer }, { uid, targetUUID })

export const ipfsRoomLeave = (roomId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_LEAVE, { roomId }, { targetUUID })

export const ipfsRoomLeaveSuccess = (roomId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_LEAVE_SUCCESS, { roomId }, { targetUUID })

export const ipfsRoomLeaveFailure = (error: string, roomId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_LEAVE_FAILURE, { error, roomId }, { targetUUID })

export const ipfsRoomCreate = (topic: string, sourceUUID: string, uid: string) =>
  action(constants.IPFS_ROOM_CREATE, { topic }, { sourceUUID, uid })

export const ipfsRoomCreateSuccess = (topic: string, sourceUUID: string, uid: string) =>
  action(constants.IPFS_ROOM_CREATE_SUCCESS, { topic }, { sourceUUID, uid })

export const ipfsRoomCreateFailure = (topic: string, sourceUUID: string, uid: string) =>
  action(constants.IPFS_ROOM_CREATE_FAILURE, { topic }, { sourceUUID, uid })

export const ipfsRoomGetPeers = (roomId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_GET_PEERS, { roomId }, { targetUUID })

export const ipfsRoomGetPeersSuccess = (roomId: string, peerList: string[], uid: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_GET_PEERS_SUCCESS, { roomId, peerList }, { targetUUID, uid })

export const ipfsRoomGetPeersFailure = (error: string, roomId: string, uid: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_GET_PEERS_FAILURE, { error, roomId }, { targetUUID, uid })
