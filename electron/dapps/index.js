import store from './array';


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

}

 
initUi();