import { store, sendDataChannel1, sendDataChannel2, receiveDataChannel } from './array';
import * as actions from './redux/actions/channel';

const renderState = () => {
  //next todo library object dapp will emit events on store pub-sub actions in: `dapp.emit('event-name', ...)`

};

const initUi = () => {
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
          targetDapp: 'Game'
        }
      });
    });
  }

  if (document.getElementById('networkGetBlockButton')) {
    document.getElementById('networkGetBlockButton').addEventListener('click', () => {
      store.dispatch(actions.networkGetBlock());
    });
  }

  if (document.getElementById('networkSubscribeButton')) {
    document.getElementById('networkSubscribeButton').addEventListener('click', () => {
      store.dispatch(actions.networkSubscribe());
    });
  }

  if (document.getElementById('networkUnsubscribeButton')) {
    document.getElementById('networkUnsubscribeButton').addEventListener('click', () => {
      store.dispatch(actions.networkUnsubscribe());
    });
  }

  if (document.getElementById('networkGetWitnessButton')) {
    document.getElementById('networkGetWitnessButton').addEventListener('click', () => {
      const witnessIdInput = <HTMLInputElement>document.getElementById("networkWitnessId");
      store.dispatch(actions.networkGetWitness(witnessIdInput.value));
    });
  }

  //Open files (File Manager)
  if (document.getElementById('openDialogButton')) {
    document.getElementById('openDialogButton').addEventListener('click', () => {
      store.dispatch(actions.openFileManagerDialog());
    });
  }

  // Download
  if (document.getElementById('downloadButton')) {
    document.getElementById('downloadButton').addEventListener('click', () => {
      const ipfsHashElement = <HTMLInputElement> document.getElementById('ipfsHash');
      if (ipfsHashElement.value) {
        store.dispatch(actions.downloadIpfsFile(ipfsHashElement.value));
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
      //sendDataChannelId('channelId', action);
    });
  }

  if (document.getElementById('ipfsRoomSubscribe')) {
    document.getElementById('ipfsRoomSubscribe').addEventListener('submit', (e: any) => {
      e.preventDefault();
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
      e.preventDefault();
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
      e.preventDefault();
      const formElements = e.target.elements;
      const { message, peerHash } = formElements;

      const roomNameElement = <HTMLInputElement> document.getElementById('ipfsRoomName');
      store.dispatch(
        actions.ipfsRoomSendMessageToPeer(message.value || '', roomNameElement.value || '', peerHash.value || '')
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
      store.dispatch(actions.writeToConsole(input.value));
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
      e.preventDefault();

      const formElements = e.target.elements;

      const dbName = formElements.dbName && formElements.dbName.value || '';

      store.dispatch(actions.orbitDbCreateDatabase(dbName));

    });
  }

  if (document.getElementById('orbitDbOpenDatabase')) {
    document.getElementById('orbitDbOpenDatabase').addEventListener('submit', (e: any) => {
      e.preventDefault();

      const formElements = e.target.elements;

      const dbName = formElements.dbName && formElements.dbName.value || '';

      store.dispatch(actions.orbitDbOpenDatabase(dbName));

    });
  }

  if (document.getElementById('orbitDbAddEntry')) {
    document.getElementById('orbitDbAddEntry').addEventListener('submit', (e: any) => {
      e.preventDefault();

      const formElements = e.target.elements;

      const dbName = formElements.dbName && formElements.dbName.value || '';
      const json = formElements.json && formElements.json.value || '{}';

      store.dispatch(actions.orbitDbAddEntry(dbName, JSON.parse(json)));

    });
  }

  if (document.getElementById('orbitDbGetEntry')) {
    document.getElementById('orbitDbGetEntry').addEventListener('submit', (e: any) => {
      e.preventDefault();

      const formElements = e.target.elements;

      const dbName = formElements.dbName && formElements.dbName.value || '';
      const hash = formElements.hash && formElements.hash.value || '';

      store.dispatch(actions.orbitDbGetEntry(dbName, hash));

    });
  }

  if (document.getElementById('orbitDbGetAllEntries')) {
    document.getElementById('orbitDbGetAllEntries').addEventListener('submit', (e: any) => {
      e.preventDefault();

      const formElements = e.target.elements;

      const dbName = formElements.dbName && formElements.dbName.value || '';

      store.dispatch(actions.orbitDbGetAllEntries(dbName));

    });
  }
};

initUi();
