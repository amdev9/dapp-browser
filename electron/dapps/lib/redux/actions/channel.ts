import { action } from 'typesafe-actions'
import * as constants from '../constants'

export const openChannelIntent = () => action(constants.INTENT_OPEN_CHANNELS)

export const openFileManagerDialog = () => action(constants.FILE_MANAGER_OPEN_DIALOG)

export const uploadIpfsFile = (entry: string) => action(constants.IPFS_STORAGE_UPLOAD_FILE, {entry})

export const showFileEntries = () => action(constants.SHOW_FILE_ENTRIES)

export const networkGetBlock = () => action(constants.NETWORK_GET_BLOCK)
export const networkGetWitness = () => action(constants.NETWORK_GET_WITNESS)


export const writeToConsole = (message: string) =>  action(constants.LOGGER_WRITE, { message })


export const showBlock = () => action(constants.SHOW_BLOCK)

export const downloadIpfsFile = (hash: string) =>
  action(constants.IPFS_STORAGE_DOWNLOAD_FILE, { hash })


export const keychainCreate = (key: string, cipher: string, curve: string) =>
  action(constants.KEYCHAIN_CREATE, {key, cipher, curve})

export const keychainList = () => action(constants.KEYCHAIN_LIST)

export const keychainSign = (key: string, chainId: string, transaction: string) =>
  action(constants.KEYCHAIN_SIGN, {key, chainId, transaction})

export const keychainShowResult = () => action(constants.KEYCHAIN_SHOW_RESULT)
