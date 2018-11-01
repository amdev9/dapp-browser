import * as React from 'react';
import * as uuidv4 from 'uuid/v4';
import { AnyAction } from 'redux';
import { store, sendDataChannel1, sendDataChannel2, receiveDataChannel, emitter } from './array';
import * as actions from './redux/actions/channel';
import * as constants from './redux/constants';

// Import business logic for Chat app
import './chat/chat';

type actionWrapper = (uid?: string, entry?: any, targetUUID?: string) => AnyAction;

class ArrayIO {
  store: any;
  emitter: any;

  constructor(store: any, emitter: any) {
    this.store = store;
    this.emitter = emitter;
  }

  handleUidPromise = (actionFlow: actionWrapper[], params?: any) => {
    const uid = uuidv4();
    return (resolve: any, reject: any) => {

      this.emitter.on(uid, function (action: AnyAction) {
        if (action.meta.uid === uid) {
          if (action.type === actionFlow[1]().type) {
            resolve(action.payload);
          } else if (action.type === actionFlow[2]().type) {
            reject(action.payload);
          }
        } else {
          console.log('Uid spoofing');
        }
      });
      this.store.dispatch(actionFlow[0](uid, params));
    };
  };

  openFileManager = async () => {
    return new Promise(
      this.handleUidPromise([
        actions.openFileManagerDialog,
        actions.openDialogSuccess,
        actions.openDialogFailure,
      ], []),
    );
  };

  networkGetBlock = async () => {
    return new Promise(
      this.handleUidPromise([
        actions.networkGetBlock,
        actions.getBlockSuccess,
        actions.getBlockFailure,
      ], []),
    );
  };

  networkSubscribe = async () => {
    return new Promise(
      this.handleUidPromise([
        actions.networkSubscribe,
        actions.networkSubscribeSuccess,
        actions.networkSubscribeFailure,
      ], []),
    );
  };

  writeToConsole = async (message: string) => {
    return new Promise(
      this.handleUidPromise([
        actions.writeToConsole,
        actions.loggerWriteSuccess,
        actions.loggerWriteFailure,
      ], [message]),
    );
  };

  storageSave = async (key: string, value: string) => {
    return new Promise(
      this.handleUidPromise([
        actions.storageSave,
        actions.storageSaveSuccess,
        actions.storageSaveFailure,
      ], { key, value }),
    );
  };
}


const array = new ArrayIO(store, emitter);

const renderState = () => {
  // next todo library object dapp will emit events on store pub-sub actions in: `dapp.emit('event-name', ...)`
};

interface ActionFlow {
  onStart: AnyAction;
  successType: string;
  failureType: string;
}

interface SubscribeOptions {
  onMessage: (message: any) => void;
  onJoined?: (peer: string) => void;
  onLeft?: (peer: string) => void;
  onSubscribe?: (peer: string) => void;
}

export class Chat {
  store: any;
  emitter: any;
  topic: string;
  uid: string;
  // Callbacks for removing listeners
  unsubscribeOnMessage: () => void | null;
  unsubscribeOnLeft: () => void | null;
  unsubscribeOnJoined: () => void | null;

  constructor() {
    this.store = store;
    this.emitter = emitter;
  }

  onUIDEvent(uid: string, callback: (action: any) => void) {
    const listener = (action: AnyAction) => {
      if (action.meta.uid === uid) {
        callback(action);
      } else {
        console.log('Uid spoofing');
      }
    };
    this.emitter.on(uid, listener);

    return () => this.emitter.removeListener(uid, listener);
  }

  onAction(actionType: string, uid: string, callback: (message: any) => void) {
    return this.onUIDEvent(uid, (action) => {
      if (actionType && action.type === actionType) {
        callback(action);
      }
    });
  }

  handleUIDAction(uid: string, options: ActionFlow) {
    if (!options) {
      return;
    }

    const copyAction = Object.assign({}, options.onStart, { meta: { uid } });

    return new Promise((resolve, reject) => {
      options.successType && this.onAction(options.successType, this.uid, (action) => resolve(action));
      options.failureType && this.onAction(options.failureType, this.uid, (action) => reject(action));
      options.onStart && this.store.dispatch(copyAction);
    });
  }

  async subscribe(topic: string, options: SubscribeOptions) {
    const uid = uuidv4();
    this.topic = topic;
    this.uid = uid;

    if (!options) {
      return;
    }

    const action: any = await this.handleUIDAction(uid, {
      onStart: actions.ipfsRoomSubscribe(topic),
      successType: constants.IPFS_ROOM_SUBSCRIBE_SUCCESS,
      failureType: constants.IPFS_ROOM_SUBSCRIBE_FAILURE,
    });

    this.unsubscribeOnMessage = this.onAction(constants.IPFS_ROOM_SEND_MESSAGE_TO_DAPP, uid, (action) => options.onMessage(action.payload.message));
    this.unsubscribeOnJoined = this.onAction(constants.IPFS_ROOM_PEER_JOINED, uid, (action) => options.onJoined(action.payload.peer));
    this.unsubscribeOnLeft = this.onAction(constants.IPFS_ROOM_PEER_LEFT, uid, (action) => options.onLeft(action.payload.peer));

    options.onSubscribe && options.onSubscribe(action.payload.peerId);
  }

  async sendMessageBroadcast(message: string) {
    console.log('sendMessageBroadcast', message, this.topic);
    return this.handleUIDAction(this.uid, {
      onStart: actions.ipfsRoomSendMessageBroadcast(message, this.topic),
      successType: constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_SUCCESS,
      failureType: constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_FAILURE,
    });
  }

  async sendMessageTo(message: string, peer: string) {
    return this.handleUIDAction(this.uid, {
      onStart: actions.ipfsRoomSendMessageToPeer(message, this.topic, peer),
      successType: constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_SUCCESS,
      failureType: constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_FAILURE,
    });
  }

  leave() {
    this.store.dispatch(actions.ipfsRoomLeave(this.topic));
    this.unsubscribeOnMessage && this.unsubscribeOnMessage();
    this.unsubscribeOnJoined && this.unsubscribeOnJoined();
    this.unsubscribeOnLeft && this.unsubscribeOnLeft();
  }
}

// const chat = new Chat();
//
// chat.subscribe('topic', {
//   onSubscribe: () => console.log('subscribed!'),
//   onJoined: peer => console.log('onjoined', peer),
//   onLeft: peer => console.log('onleft', peer),
//   onMessage: message => console.log('onmessage', message),
// });

const initUi = async () => {
  renderState();
  store.subscribe(renderState);

  receiveDataChannel('testChannel2', (channelData: any) => {
    document.getElementById('area').innerHTML = channelData;
  });

  receiveDataChannel('testChannel1', (channelData: any) => {
    document.getElementById('messageId').innerHTML = channelData;
  });

  if (document.getElementById('communicate')) {
    document.getElementById('communicate').addEventListener('click', () => {
      store.dispatch({
        type: 'INTENT_OPEN_CHANNELS',
        payload: {
          targetDapp: 'Game',
        },
      });
    });
  }

  if (document.getElementById('networkGetBlockButton')) {
    document.getElementById('networkGetBlockButton').addEventListener('click', async () => {
      try {
        const block = await array.networkGetBlock();
        console.log('networkGetBlock method\n block: ', block);
      } catch (error) {
        console.log('networkGetBlock method\n error: ', error);
      }
      // store.dispatch(actions.networkGetBlock());
    });
  }

  if (document.getElementById('networkSubscribeButtonDapp')) {
    array.networkSubscribe(); // subscribe on Dapp load

    document.getElementById('networkSubscribeButtonDapp').addEventListener('click', () => {
      array.networkSubscribe();
    });
  }

  if (document.getElementById('networkUnsubscribeButtonDapp')) {
    document.getElementById('networkUnsubscribeButtonDapp').addEventListener('click', () => {
      store.dispatch(actions.networkUnsubscribe());
    });
  }

  if (document.getElementById('networkSubscribeButton')) {
    document.getElementById('networkSubscribeButton').addEventListener('click', () => {
      array.networkSubscribe();
    });
  }

  if (document.getElementById('networkUnsubscribeButton')) {
    document.getElementById('networkUnsubscribeButton').addEventListener('click', () => {
      store.dispatch(actions.networkUnsubscribe());
    });
  }

  if (document.getElementById('networkGetWitnessButton')) {
    document.getElementById('networkGetWitnessButton').addEventListener('click', () => {
      const witnessIdInput = <HTMLInputElement>document.getElementById('networkWitnessId');
      store.dispatch(actions.networkGetWitness(witnessIdInput.value));
    });
  }

  // Open files (File Manager)
  if (document.getElementById('openDialogButton')) {
    document.getElementById('openDialogButton').addEventListener('click', async () => {
      const fileId = await array.openFileManager();
      console.log('openFileManager method\n fileId: ', fileId);
      // store.dispatch(actions.openFileManagerDialog());
    });
  }

  // Download
  if (document.getElementById('downloadButton')) {
    document.getElementById('downloadButton').addEventListener('click', async () => {
      const ipfsHashElement = <HTMLInputElement> document.getElementById('ipfsHash');
      if (ipfsHashElement.value) {
        try {
          store.dispatch(actions.downloadIpfsFile(ipfsHashElement.value));
          // const fileDownloaded = await array.downloadIpfsByHash(ipfsHashElement.value);
          // console.log('downloadIpfsByHash method\n fileDownloaded: ', fileDownloaded);
        } catch (error) {
          console.log('downloadIpfsByHash method\n error: ', error);
        }
        // store.dispatch(actions.downloadIpfsFile(ipfsHashElement.value));
      }
    });
  }

  if (document.getElementById('sendchannel1')) {
    document.getElementById('sendchannel1').addEventListener('click', () => {
      sendDataChannel1('testdata 1');
    });
  }

  if (document.getElementById('sendchannel2')) {
    document.getElementById('sendchannel2').addEventListener('click', () => {
      sendDataChannel2('testdata 2');
    });
  }

  if (document.getElementById('send_channel')) {
    document.getElementById('send_channel').addEventListener('click', () => {
      // sendDataChannelId('channelId', action);
    });
  }

  if (document.getElementById('ipfsRoomSubscribe')) {
    document.getElementById('ipfsRoomSubscribe').addEventListener('submit', (e: any) => {
      // e.preventDefault();
      const formElements = e.target.elements;
      const roomName = formElements.ipfsRoomName && formElements.ipfsRoomName.value;

      const logElement = document.getElementById('ipfsRoomLog');

      if (logElement) {
        logElement.innerText = '';
      }
      store.dispatch(actions.ipfsRoomSubscribe(roomName));
    });
  }

  if (document.getElementById('ipfsRoomSendBroadcastTextForm')) {
    document.getElementById('ipfsRoomSendBroadcastTextForm').addEventListener('submit', (e: any) => {
      // e.preventDefault();
      const formElements = e.target.elements;
      const message = formElements.message && formElements.message.value || '';

      const roomNameElement = <HTMLInputElement> document.getElementById('ipfsRoomName');
      const roomName = roomNameElement && roomNameElement.value || '';
      console.log('topic', roomName, message);
      store.dispatch(actions.ipfsRoomSendMessageBroadcast(message, roomName));
    });
  }

  if (document.getElementById('ipfsRoomSendToPeerTextForm')) {
    document.getElementById('ipfsRoomSendToPeerTextForm').addEventListener('submit', (e: any) => {
      // e.preventDefault();
      const formElements = e.target.elements;
      const { message, peerHash } = formElements;

      const roomNameElement = <HTMLInputElement> document.getElementById('ipfsRoomName');
      store.dispatch(
        actions.ipfsRoomSendMessageToPeer(message.value || '', roomNameElement.value || '', peerHash.value || ''),
      );
    });
  }

  if (document.getElementById('ipfsRoomLeaveButton')) {
    document.getElementById('ipfsRoomLeaveButton').addEventListener('click', (e: any) => {
      const roomNameElement = <HTMLInputElement> document.getElementById('ipfsRoomName');
      store.dispatch(actions.ipfsRoomLeave(roomNameElement.value || ''));
    });
  }

  if (document.getElementById('sendToConsoleButton')) {
    document.getElementById('sendToConsoleButton').addEventListener('click', () => {
      const input = <HTMLInputElement>document.getElementById('consoleText');
      // store.dispatch(actions.writeToConsole(input.value));
      array.writeToConsole(input.value);
    });
  }

  if (document.getElementById('keychainCreateButton')) {
    document.getElementById('keychainCreateButton').addEventListener('click', () => {
      const input = <HTMLInputElement>document.getElementById('keychainKey');
      store.dispatch(actions.keychainCreate(input.value, 'CIPHER_AES256', 'CURVE_SECP256K1'));
    });
    document.getElementById('keychainListButton').addEventListener('click', () => {
      store.dispatch(actions.keychainList());
    });
    document.getElementById('keychainSignButton').addEventListener('click', () => {
      const keyInput = <HTMLInputElement>document.getElementById('keychainKey');
      const chainIdInput = <HTMLInputElement>document.getElementById('keychainChainId');
      const transactionIdInput = <HTMLInputElement>document.getElementById('keychainTransactionId');
      store.dispatch(actions.keychainSign(keyInput.value, chainIdInput.value, transactionIdInput.value));
    });
  }

  if (document.getElementById('orbitDbCreateDatabase')) {
    document.getElementById('orbitDbCreateDatabase').addEventListener('submit', (e: any) => {
      // e.preventDefault();

      const formElements = e.target.elements;

      const dbName = formElements.dbName && formElements.dbName.value || '';

      store.dispatch(actions.orbitDbCreateDatabase(dbName));

    });
  }

  if (document.getElementById('orbitDbOpenDatabase')) {
    document.getElementById('orbitDbOpenDatabase').addEventListener('submit', (e: any) => {
      // e.preventDefault();

      const formElements = e.target.elements;

      const dbName = formElements.dbName && formElements.dbName.value || '';

      store.dispatch(actions.orbitDbOpenDatabase(dbName));

    });
  }

  if (document.getElementById('orbitDbAddEntry')) {
    document.getElementById('orbitDbAddEntry').addEventListener('submit', (e: any) => {
      // e.preventDefault();

      const formElements = e.target.elements;

      const dbName = formElements.dbName && formElements.dbName.value || '';
      const json = formElements.json && formElements.json.value || '{}';

      store.dispatch(actions.orbitDbAddEntry(dbName, JSON.parse(json)));

    });
  }

  if (document.getElementById('orbitDbGetEntry')) {
    document.getElementById('orbitDbGetEntry').addEventListener('submit', (e: any) => {
      // e.preventDefault();

      const formElements = e.target.elements;

      const dbName = formElements.dbName && formElements.dbName.value || '';
      const hash = formElements.hash && formElements.hash.value || '';

      store.dispatch(actions.orbitDbGetEntry(dbName, hash));

    });
  }

  if (document.getElementById('orbitDbGetAllEntries')) {
    document.getElementById('orbitDbGetAllEntries').addEventListener('submit', (e: any) => {
      // e.preventDefault();

      const formElements = e.target.elements;

      const dbName = formElements.dbName && formElements.dbName.value || '';

      store.dispatch(actions.orbitDbGetAllEntries(dbName));

    });
  }

  if (document.getElementById('storageSaveButton')) {
    document.getElementById('storageSaveButton').addEventListener('click', (e: any) => {
      const keyElement = <HTMLInputElement>document.getElementById('storageKey');
      const valueElement = <HTMLInputElement>document.getElementById('storageValue');
      array.storageSave(keyElement.value, valueElement.value);
    });
  }
};

initUi();
