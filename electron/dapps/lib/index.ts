import { store, sendDataChannel1, sendDataChannel2, receiveDataChannel } from './array';
import * as actions from './redux/actions/channel'

const renderState = () => {
  //next todo library object dapp will emit events on store pub-sub actions in: `dapp.emit('event-name', ...)`
 
}

const initUi = () => {
  renderState();
  store.subscribe(renderState);

  receiveDataChannel('testChannel2', (channelData: any) => {
    document.getElementById('area').innerHTML = channelData;
  })

  receiveDataChannel('testChannel1', (channelData: any) => {
    document.getElementById('messageId').innerHTML = channelData;
  })

  if( document.getElementById('communicate') ) {
    document.getElementById('communicate').addEventListener('click', () => {
      store.dispatch({
        type: 'INTENT_OPEN_CHANNELS',
        payload: {
          targetDapp: 'Game' 
        }
      });
    });
  }

  if( document.getElementById('openDialogButton') ) {
    document.getElementById('openDialogButton').addEventListener('click', () => {
      store.dispatch(actions.openFileManagerDialog());
    });
  }

  if( document.getElementById('sendchannel1') ) {
    document.getElementById('sendchannel1').addEventListener('click', () => {
      sendDataChannel1('testdata 1');
    });
  }
  
  if( document.getElementById('sendchannel2') ) {
    document.getElementById('sendchannel2').addEventListener('click', () => {
      sendDataChannel2('testdata 2');
    });
  }

  if( document.getElementById('file1') ) {
    document.getElementById('file1').addEventListener('click', () => {
      store.dispatch({
        type: 'INTENT_OPEN_FILE',
        payload: {
          targetDapp: 'Game'
        }
      });
    });
  }


  if( document.getElementById('intent_channel') ) {
    document.getElementById('intent_channel').addEventListener('click', () => {
      store.dispatch({
        type: 'INTENT_CHANNEL_DATA_PASS',
        payload: {
          component: 'FM'
        }
      });
    });
  }

  if( document.getElementById('send_channel') ) {
    document.getElementById('send_channel').addEventListener('click', () => {
      //sendDataChannelId('channelId', action);
    });
  }


  //@todo add 
  // INTENT_CHANNEL_DATA_PASS(FM)
  // ACCEPT_CHANNEL_DATA_PASS(ChannelId)
  // through new channelId
  // FM_OPEN_FILE
  // FM_OPEN_FILE_SUCCESS
};

initUi();
