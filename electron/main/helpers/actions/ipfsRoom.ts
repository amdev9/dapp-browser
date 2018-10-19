import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const ipfsRoomSubscribeSuccess = () => action(constants.IPFS_ROOM_SUBSCRIBE_SUCCESS)

export const ipfsRoomSubscribeFailure = () => action(constants.IPFS_ROOM_SUBSCRIBE_FAILURE)
