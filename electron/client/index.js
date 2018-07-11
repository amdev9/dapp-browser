import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';
import { Provider, ReactRedux } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { logger } from 'redux-logger';
import { isFSA } from 'flux-standard-action';

import Counter from './components/Counter'
import { rootEpic } from './redux/epics';
import rootReducer from './redux/reducers';

const epicMiddleware = createEpicMiddleware(rootEpic); // `createEpicMiddleware(rootEpic)` is no longer supported, instead use `epicMiddleware.run(rootEpic)`


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
        electronManager.sendActionMain(action); // window.ipc  
        // stop action in-flight
        // eslint-disable-next-line consistent-return
        return;
    }
    // eslint-disable-next-line consistent-return
    return next(action);
};

const configureStore = (initialState) => {
    const middleware = [forwardToMain, logger]; // epicMiddleware
    const enhanced = [
        applyMiddleware(...middleware),
    ];
    const enhancer = compose(...enhanced);
    console.log(typeof rootReducer, initialState, typeof enhancer);
    const store = createStore(rootReducer, initialState, enhancer);
    electronManager.replyActionRenderer(store); // window.ipc
    return store;
};

const initStore = () => {
    console.log('initStore');
    const states = electronManager.getGlobalState(); // window.ipc 
    console.log(states);
    const initialState = JSON.parse(states()); // getInitialStateRenderer();  
    const store = configureStore(initialState);
    return store;
}

// // electron-redux store
const store = initStore();
 
// const middleware = [epicMiddleware, logger]; 
// const enhanced = [
//     applyMiddleware(...middleware),
// ];
// const enhancer = compose(...enhanced);
// const store = createStore(rootReducer, {}, enhancer);

render(
    <Provider store={store}>
      <Counter />
    </Provider>,
    document.getElementById('root')
);
  