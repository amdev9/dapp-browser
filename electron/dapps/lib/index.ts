import { store, sendDataChannel1, sendDataChannel2, receiveDataChannel } from './array';

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
};

initUi();
