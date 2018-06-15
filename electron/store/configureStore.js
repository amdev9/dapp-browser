const { webContents, ipcMain } = require('electron');
const { combineReducers, createStore, applyMiddleware, compose } = require('redux');
const thunk = require('redux-thunk').default;
const { hashHistory } = require('react-router');
const { routerMiddleware } = require('react-router-redux');
const { isFSA } = require('flux-standard-action');

const rootReducer = require('../reducers');

const validateAction = (action) => {
  if (!isFSA(action)) {
    // log('WARNING! Action not FSA-compliant', action);
    return false;
  }
  return true;
}

const forwardToRenderer = () => next => (action) => {
  if (!validateAction(action)) return next(action);
  if (action.meta && action.meta.scope === 'local') return next(action);

  // change scope to avoid endless-loop
  const rendererAction = {
    ...action,
    meta: {
      ...action.meta,
      scope: 'local',
    },
  };

  const allWebContents = webContents.getAllWebContents();

  allWebContents.forEach((contents) => {
    contents.send('redux-action', rendererAction);
  });

  return next(action);
};

const replayActionMain = (store) => {
  /**
   * Give renderers a way to sync the current state of the store, but be sure
   * we don't expose any remote objects. In other words, we need our state to
   * be serializable.
   *
   * Refer to https://github.com/electron/electron/blob/master/docs/api/remote.md#remote-objects
   */
  global.getReduxState = () => JSON.stringify(store.getState());

  ipcMain.on('redux-action', (event, payload) => {
    store.dispatch(payload);
  });
}

const configureStore = (initialState) => {
  const middleware = [];
  middleware.push(thunk);
  const router = routerMiddleware(hashHistory);
 
  middleware.push( forwardToRenderer); // triggerAlias, 
  // add middleware for permissions verifications

  const enhanced = [applyMiddleware(...middleware, router)]; 
  const enhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  replayActionMain(store); // verification for payload, use custom electron-redux like decision
   
  return store;
};

module.exports = configureStore;