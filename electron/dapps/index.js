 //***** define redux, redux-thunk with browserify */
const { combineReducers, createStore, applyMiddleware, compose } = require('redux');
// const thunk = require('redux-thunk').default;
const { isFSA } = require('flux-standard-action');
const rootReducer = require('./redux/reducers'); 

const electronManager = window.ipc;

const validateAction = (action) => {
  return isFSA(action);
}

const forwardToMain = store => next => (action) => {
  if (!validateAction(action)) return next(action);

  if (
    action.type.substr(0, 2) !== '@@' &&
    action.type.substr(0, 10) !== 'redux-form' &&
    (!action.meta ||
      !action.meta.scope ||
      action.meta.scope !== 'local'
    )
  ) {
    electronManager.sendActionMain(action); // window.ipc  /**** access from preload script */ 

    // stop action in-flight
    // eslint-disable-next-line consistent-return
    return;
  }

  // eslint-disable-next-line consistent-return
  return next(action);
};

const configureStore = (initialState) => {

  const middleware = [forwardToMain];
  const enhanced = [
    applyMiddleware(...middleware),
  ];
  const enhancer = compose(...enhanced);

  console.log(typeof rootReducer, initialState, typeof enhancer);
  store = createStore(rootReducer, initialState, enhancer);

  electronManager.replyActionRenderer(store); // window.ipc

  return store;
};


const initStore = () => {
  // console.log('initStore');
  const states = electronManager.getGlobalState(); // window.ipc 
  console.log(states);
  const initialState = JSON.parse(states()); // getInitialStateRenderer();  

  const store = configureStore(initialState);
  return store;
}

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

  document.getElementById('ping').addEventListener('click', () => {

    console.log('click on ping');
    store.dispatch({
      type: 'SEND_PING_MESSAGE'  

    //   payload: { 
    //     message: 'this is a ping message',
    //     dappIdReceiver: 'dappname128729index'  
    // }
    }); // dispatch API endpoints
  });

}

// main
store = initStore();
initUi();