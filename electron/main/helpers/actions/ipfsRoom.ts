import { action } from 'typesafe-actions';

import * as constants from '../constants';
import { Message } from '../IpfsRoom'

export const ipfsRoomSubscribe = (topic: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SUBSCRIBE, { topic }, { targetUUID })

export const ipfsRoomSubscribeSuccess = (peerId: string, topic: string, uid: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SUBSCRIBE_SUCCESS, { peerId, topic }, { uid, targetUUID })

export const ipfsRoomSubscribeFailure = (error: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SUBSCRIBE_FAILURE, { error }, { targetUUID })

export const ipfsRoomSendMessageToDapp = (message: Message, roomName: string, uid: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_DAPP, { message, roomName }, { uid, targetUUID })

export const ipfsRoomSendMessageBroadcast = (messageId: string, message: string | Buffer, roomName: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST, { messageId, message, roomName }, { targetUUID })

export const ipfsRoomSendMessageBroadcastSuccess = (messageId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_SUCCESS, { messageId }, { targetUUID })

export const ipfsRoomSendMessageBroadcastFailure = (error: string, messageId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_FAILURE, { error, messageId }, { targetUUID })

export const ipfsRoomSendMessageToPeer = (messageId: string, message: string | Buffer, roomName: string, peer: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER, { message, messageId, roomName, peer }, { targetUUID })

export const ipfsRoomSendMessageToPeerSuccess = (messageId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_SUCCESS, { messageId })

export const ipfsRoomSendMessageToPeerFailure = (error: string, messageId: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_FAILURE, { error, messageId }, { targetUUID })

export const ipfsRoomPeerJoined = (peer: string, uid: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_PEER_JOINED, { peer }, { uid, targetUUID })

export const ipfsRoomPeerLeft = (peer: string, uid: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_PEER_LEFT, { peer }, { uid, targetUUID })

export const ipfsRoomLeave = (roomName: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_LEAVE, { roomName }, { targetUUID })

export const ipfsRoomLeaveSuccess = (roomName: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_LEAVE_SUCCESS, { roomName }, { targetUUID })

export const ipfsRoomLeaveFailure = (error: string, roomName: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_LEAVE_FAILURE, { error, roomName }, { targetUUID })
