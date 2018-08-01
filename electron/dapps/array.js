import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { isFSA } from 'flux-standard-action';
import { createEpicMiddleware } from 'redux-observable';
import { logger } from 'redux-logger';
import { rootEpic } from './redux/epics';
import rootReducer from './redux/reducers'; 


const epicMiddleware = createEpicMiddleware();

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
    electronManager.sendActionMain(action);  

    // stop action in-flight
    // eslint-disable-next-line consistent-return
    return;
  }

  // eslint-disable-next-line consistent-return
  return next(action);
};

const configureStore = (initialState) => {

  const middleware = [forwardToMain, epicMiddleware, logger];
  const enhanced = [
    applyMiddleware(...middleware),
  ];
  const enhancer = compose(...enhanced);

 
  const store = createStore(rootReducer, initialState, enhancer);

  epicMiddleware.run(rootEpic);

  electronManager.replyActionRenderer(store);  

  return store;
};


const initStore = () => {
  const states = electronManager.getGlobalState();  
  console.log(states);
  const initialState = JSON.parse(states()); // getInitialStateRenderer();  

  const store = configureStore(initialState);
  return store;
}
 
const sendDataChannel1 = (data) => {
  electronManager.sendDataChannel('testChannel1', data);
}

const sendDataChannel2 = (data) => {
  electronManager.sendDataChannel('testChannel2', data);
}

const receiveDataChannel = (channelId, callback) => {
  electronManager.receiveDataChannel(channelId, callback);
}

const store = initStore();

export { 
  store, 
  sendDataChannel1,
  sendDataChannel2,
  receiveDataChannel
};