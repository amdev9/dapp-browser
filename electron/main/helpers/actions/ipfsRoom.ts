import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const ipfsRoomSubscribeSuccess = (topic: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SUBSCRIBE_SUCCESS, { topic }, { targetUUID })

export const ipfsRoomSubscribeFailure = (error: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SUBSCRIBE_FAILURE, { error }, { targetUUID })

export const ipfsRoomSendMessage = (message: string, roomName: string, targetUUID: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_DAPP, { message, roomName }, { targetUUID })
