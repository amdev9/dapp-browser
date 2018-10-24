import { action } from 'typesafe-actions';
import * as uuidv4 from 'uuid/v4';

import * as constants from '../constants';

export const openChannelIntent = () => action(constants.INTENT_OPEN_CHANNELS)

export const openFileManagerDialog = () => action(constants.FILE_MANAGER_OPEN_DIALOG)

export const uploadIpfsFile = (entry: string) => action(constants.IPFS_STORAGE_UPLOAD_FILE, {entry})

export const showFileEntries = () => action(constants.SHOW_FILE_ENTRIES)

export const networkGetBlock = () => action(constants.NETWORK_GET_BLOCK)
export const networkGetWitness = (witnessId: string) => action(constants.NETWORK_GET_WITNESS, {witnessId})
export const networkSubscribe = () => action(constants.NETWORK_SUBSCRIBE)
export const networkUnsubscribe = () => action(constants.NETWORK_UNSUBSCRIBE)

export const writeToConsole = (message: string) =>  action(constants.LOGGER_WRITE, { message })


export const showBlock = () => action(constants.SHOW_BLOCK)

export const downloadIpfsFile = (hash: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE, { hash })

export const ipfsRoomSubscribe = (topic: string) =>
  action(constants.IPFS_ROOM_SUBSCRIBE, { topic })

//MessageId need to resolve message sending status
export const ipfsRoomSendMessageBroadcast = (message: string, roomName: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST, { message, roomName, messageId: uuidv4() })

export const ipfsRoomSendMessageToPeer = (message: string | Buffer, roomName: string, peer: string) =>
  action(constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER, { message, messageId: uuidv4(), roomName, peer })

export const ipfsRoomLeave = (roomName: string) =>
  action(constants.IPFS_ROOM_LEAVE, { roomName } )


export const keychainCreate = (key: string, cipher: string, curve: string) =>
  action(constants.KEYCHAIN_CREATE, {key, cipher, curve})

export const keychainList = () => action(constants.KEYCHAIN_LIST)

export const keychainSign = (key: string, chainId: string, transaction: string) =>
  action(constants.KEYCHAIN_SIGN, {key, chainId, transaction})

export const keychainShowResult = () => action(constants.KEYCHAIN_SHOW_RESULT)
