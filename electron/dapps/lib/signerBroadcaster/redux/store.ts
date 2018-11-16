import { logger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import * as actions from './actions';
import reducers from './reducers/index';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware();

const configureStore = (initialState: any = {}) => {
  const middleware = [thunk, epicMiddleware, logger];

  const store = createStore(reducers, initialState, applyMiddleware(...middleware));
  epicMiddleware.run(rootEpic);

  return store;
};

export const store = configureStore();

export const initApp = () => store.dispatch(actions.initApp());
