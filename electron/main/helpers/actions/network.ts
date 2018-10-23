import { action } from 'typesafe-actions';
import * as constants from '../constants';

export const subscribeSuccess = (targetUUID?: string) =>
  action(constants.NETWORK_SUBSCRIBE_SUCCESS, targetUUID);

export const subscribeFailure = (error: string, targetUUID?: string) =>
  action(constants.NETWORK_SUBSCRIBE_FAILURE, error, targetUUID);

export const unsubscribeSuccess = (targetUUID?: string) =>
  action(constants.NETWORK_UNSUBSCRIBE_SUCCESS, targetUUID);

export const unsubscribeFailure = (error: string, targetUUID?: string) =>
  action(constants.NETWORK_UNSUBSCRIBE_FAILURE, error, targetUUID);

export const getBlockSuccess = (block: string, targetUUID? :string) =>
  action(constants.NETWORK_GET_BLOCK_SUCCESS, block, targetUUID);

export const getBlockFailure = (error: string, targetUUID? :string) =>
  action(constants.NETWORK_GET_BLOCK_FAILURE, error, targetUUID);

export const getBlock = () =>
  action(constants.NETWORK_GET_BLOCK);

export const getWitnessSuccess = (witness: string, targetUUID? :string) =>
  action(constants.NETWORK_GET_WITNESS_SUCCESS, witness, targetUUID);

export const getWitnessFailure = (error: string, targetUUID? :string) =>
  action(constants.NETWORK_GET_WITNESS_FAILURE, error, targetUUID);

export const getWitness = (id: string) =>
  action(constants.NETWORK_GET_WITNESS, id);
