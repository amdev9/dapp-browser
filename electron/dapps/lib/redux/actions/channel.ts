import { action } from 'typesafe-actions';
import * as uuidv4 from 'uuid/v4';

import * as constants from '../constants';

export const openChannelIntent = () => action(constants.INTENT_OPEN_CHANNELS);

export const openFileManagerDialog = (uid: string) => action(constants.FILE_MANAGER_OPEN_DIALOG, {}, { uid });
export const openDialogSuccess = (entry: any, targetUUID? :string) =>
  action(constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS, { entry }, { targetUUID });
export const openDialogFailure = (error: string, targetUUID? :string) =>
  action(constants.FILE_MANAGER_OPEN_DIALOG_FAILURE, error, { targetUUID });
export const uploadIpfsFile = (entry: string) => action(constants.IPFS_STORAGE_UPLOAD_FILE, {entry});

export const showFileEntries = () => action(constants.SHOW_FILE_ENTRIES);

export const networkGetBlock = (uid: string) => action(constants.NETWORK_GET_BLOCK, {}, { uid });
export const getBlockSuccess = (block: string, targetUUID? :string) =>
  action(constants.NETWORK_GET_BLOCK_SUCCESS, block, targetUUID);
export const getBlockFailure = (error: string, targetUUID? :string) =>
  action(constants.NETWORK_GET_BLOCK_FAILURE, error, targetUUID);
export const networkGetWitness = (witnessId: string) => action(constants.NETWORK_GET_WITNESS, {witnessId})
export const networkSubscribe = () => action(constants.NETWORK_SUBSCRIBE)
export const networkUnsubscribe = () => action(constants.NETWORK_UNSUBSCRIBE)

export const writeToConsole = (uid:string, message: string) =>  action(constants.LOGGER_WRITE, { message }, { uid });
export const loggerWriteSuccess = (result: any, targetUUID? :string) =>
  action(constants.LOGGER_WRITE_SUCCESS, { result }, targetUUID);

export const loggerWriteFailure = (error: string, targetUUID? :string) =>
  action(constants.LOGGER_WRITE_FAILURE, error, targetUUID);

export const showBlock = () => action(constants.SHOW_BLOCK);

export const downloadIpfsFile = (hash: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE, { hash });

export const ipfsRoomSubscribe = (topic: string) =>
  action(constants.IPFS_ROOM_SUBSCRIBE, { topic });

// MessageId need to resolve message sending status
export const ipfsRoomSendMessageBroadcast = (message: string, roomName: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST, { message, roomName, messageId: uuidv4() });

export const ipfsRoomSendMessageToPeer = (message: string | Buffer, roomName: string, peer: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER, { message, messageId: uuidv4(), roomName, peer });

export const ipfsRoomLeave = (roomName: string) =>
  action(constants.IPFS_ROOM_LEAVE, { roomName } );

export const keychainCreate = (key: string, cipher: string, curve: string) =>
  action(constants.KEYCHAIN_CREATE, {key, cipher, curve});

export const keychainList = () => action(constants.KEYCHAIN_LIST);

export const keychainSign = (key: string, chainId: string, transaction: string) =>
  action(constants.KEYCHAIN_SIGN, {key, chainId, transaction});

export const keychainShowResult = () => action(constants.KEYCHAIN_SHOW_RESULT);
