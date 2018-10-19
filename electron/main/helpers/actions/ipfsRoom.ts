import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const ipfsRoomSubscribeSuccess = (targetUUID: string) => action(constants.IPFS_ROOM_SUBSCRIBE_SUCCESS)

export const ipfsRoomSubscribeFailure = (error: string, targetUUID: string) => action(constants.IPFS_ROOM_SUBSCRIBE_FAILURE)
