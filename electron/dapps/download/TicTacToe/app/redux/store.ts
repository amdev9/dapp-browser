import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

const configureStore = (initialState: any = {}) => {
  const middleware = [thunk, logger];

  return createStore(reducers, initialState, applyMiddleware(...middleware));
};

export const store = configureStore();
