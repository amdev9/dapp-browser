import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const getBlockSuccess = (block: string, targetUUID? :string) =>
  action(constants.NETWORK_GET_BLOCK_SUCCESS, block, targetUUID);

export const getBlockFailure = (error: string, targetUUID? :string) =>
  action(constants.NETWORK_GET_BLOCK_FAILURE, error, targetUUID);

export const getBlock = () =>
  action(constants.NETWORK_GET_BLOCK);
