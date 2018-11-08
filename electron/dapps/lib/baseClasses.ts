import * as uuidv4 from 'uuid/v4';
import { AnyAction } from 'redux';
import * as actions from './redux/actions/channel';
import { emitter, store } from './array';
import * as constants from './redux/constants';

type actionWrapper = (uid?: string, entry?: any, targetUUID?: string) => AnyAction;

export class ArrayIO {
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
  // Callbacks for removing listeners
  subscriber: Promise<any>;
  unsubscribeOnMessage: () => void | null;
  unsubscribeOnLeft: () => void | null;
  unsubscribeOnJoined: () => void | null;

  constructor() {
    this.store = store;
    this.emitter = emitter;
  }

  onUIDEvent(uid: string, callback: (action: any) => void): () => void {
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

  subscribeActions(actionTypes: string | string[], uid: string, callback: (action: AnyAction) => void) {
    return this.onUIDEvent(uid, (action) => {
      if (actionTypes && [].concat(actionTypes).includes(action.type)) {
        callback(action);
      }
    });
  }

  actionPromise(uid: string, { onStart, successType, failureType }: ActionFlow) {
    if (!onStart || !successType || !failureType) {
      return;
    }

    const copyAction = Object.assign({}, onStart, { meta: { uid } });

    return new Promise((resolve, reject) => {
      const unsubscribe = this.subscribeActions([successType, failureType], uid, (action) => {
        unsubscribe && unsubscribe();
        if (action.type === successType) {
          resolve(action);
        }

        if (action.type === failureType) {
          reject(action);
        }
      });
      onStart && this.store.dispatch(copyAction);
    });
  }

  async subscribe(topic: string, options: SubscribeOptions) {
    const uid = uuidv4();
    this.topic = topic;

    if (!options) {
      return;
    }

    this.subscriber = this.actionPromise(uid, {
      onStart: actions.ipfsRoomSubscribe(topic),
      successType: constants.IPFS_ROOM_SUBSCRIBE_SUCCESS,
      failureType: constants.IPFS_ROOM_SUBSCRIBE_FAILURE,
    });

    const action: any = await this.subscriber;

    this.unsubscribeOnMessage = this.subscribeActions(constants.IPFS_ROOM_SEND_MESSAGE_TO_DAPP, uid, (action) => options.onMessage(action.payload.message));
    this.unsubscribeOnJoined = this.subscribeActions(constants.IPFS_ROOM_PEER_JOINED, uid, (action) => options.onJoined(action.payload.peer));
    this.unsubscribeOnLeft = this.subscribeActions(constants.IPFS_ROOM_PEER_LEFT, uid, (action) => options.onLeft(action.payload.peer));

    options.onSubscribe && options.onSubscribe(action.payload.peerId);
  }

  async sendMessageBroadcast(message: string) {
    const messageId = uuidv4();
    return this.actionPromise(messageId, {
      onStart: actions.ipfsRoomSendMessageBroadcast(message, this.topic, messageId),
      successType: constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_SUCCESS,
      failureType: constants.IPFS_ROOM_SEND_MESSAGE_BROADCAST_FAILURE,
    });

  }

  async sendMessageTo(message: string, peer: string) {
    const messageId = uuidv4();
    return this.actionPromise(messageId, {
      onStart: actions.ipfsRoomSendMessageToPeer(message, this.topic, peer, messageId),
      successType: constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_SUCCESS,
      failureType: constants.IPFS_ROOM_SEND_MESSAGE_TO_PEER_FAILURE,
    });
  }

  async leave() {
    await this.subscriber;
    this.store.dispatch(actions.ipfsRoomLeave(this.topic));
    this.unsubscribeOnMessage && this.unsubscribeOnMessage();
    this.unsubscribeOnJoined && this.unsubscribeOnJoined();
    this.unsubscribeOnLeft && this.unsubscribeOnLeft();
  }
}
