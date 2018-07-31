import { store, sendDataChannel1, sendDataChannel2, receiveDataChannel } from './array';


const renderState = () => {

  //next todo library object dapp will emit events on store pub-sub actions in: `dapp.emit('event-name', ...)`

  // console.log(JSON.stringify(store.getState()));
  if (document.getElementById('value')) {
    document.getElementById('value').innerHTML = store.getState().counter;
  }
}

const initUi = () => {
  renderState();
  store.subscribe(renderState);

  receiveDataChannel((channelData) => {
    document.getElementById('area').innerHTML = channelData;
  })

  document.getElementById('increment').addEventListener('click', () => {
    store.dispatch({
      type: 'INCREMENT_COUNTER'
    }); // dispatch API endpoints
  });

  document.getElementById('decrement').addEventListener('click', () => {
    store.dispatch({
      type: 'DECREMENT_COUNTER'
    }); // dispatch API endpoints
  });

  document.getElementById('communicate').addEventListener('click', () => {
    store.dispatch({
      type: 'INTENT_OPEN_CHANNELS',
      payload: {
        targetDapp: 'dappname128729index2' 
      }
    }); // dispatch API endpoints
  });

  

  document.getElementById('sendchannel1').addEventListener('click', () => {
    sendDataChannel1('testdata 1');
  });

  document.getElementById('sendchannel2').addEventListener('click', () => {
    sendDataChannel2('testdata 2');
  });
}

 
initUi();