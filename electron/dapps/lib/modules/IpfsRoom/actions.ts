import { action } from 'typesafe-actions';
import * as constants from './constants';

export const ipfsRoomSubscribe = (topic: string) =>
  action(constants.IPFS_ROOM_SUBSCRIBE, { topic });

// MessageId need to resolve message sending status
export const ipfsRoomSendMessageBroadcast = (message: string, roomId: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST, { message, roomId });

export const ipfsRoomSendMessageToPeer = (message: string | Buffer, roomId: string, peer: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER, { message, roomId, peer });

export const ipfsRoomLeave = (roomId: string) =>
  action(constants.IPFS_ROOM_LEAVE, { roomId });

export const ipfsRoomGetPeers = (roomId: string) =>
  action(constants.IPFS_ROOM_GET_PEERS, { roomId })

export const ipfsRoomGetPeersSuccess = (roomId: string, peerList: string[]) =>
  action(constants.IPFS_ROOM_GET_PEERS_SUCCESS, { roomId, peerList })

export const ipfsRoomGetPeersFailure = (error: string, roomId: string) =>
  action(constants.IPFS_ROOM_GET_PEERS_FAILURE, { error, roomId })
