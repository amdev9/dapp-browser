//***** define redux, redux-thunk with browserify */
const { combineReducers, createStore, applyMiddleware, compose } = require('redux');
const thunk = require('redux-thunk').default;
const logger = require('redux-logger').default;
const { isFSA } = require('flux-standard-action');
const rootReducer = require('../reducers');

const electronManager = window.ipc;

const validateAction = (action) => {
    if (!isFSA(action)) {
        // log('WARNING! Action not FSA-compliant', action);
        return false;
    }
    return true;
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

    const middleware = [forwardToMain, thunk, logger]; 
    const enhanced = [
        applyMiddleware(...middleware),
    ];
    const enhancer = compose(...enhanced);

    console.log(typeof rootReducer, initialState, typeof enhancer);
    store = createStore(rootReducer, initialState, enhancer);

    electronManager.replayActionRenderer(store); // window.ipc

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

const renderState = () => {
    // console.log(JSON.stringify(store.getState().counter));
    document.getElementById('value').innerHTML = store.getState().counter;
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

    document.getElementById('switch_tab').addEventListener('click', () => {
         
        store.dispatch({
            type: 'SWITCH_DAPP',
            payload: { 
                targetDappId: '8g1hf08r1gub' //TODO fix to name of dapp
            }
        }); // dispatch API endpoints
    });
}


// main
store = initStore();
initUi();