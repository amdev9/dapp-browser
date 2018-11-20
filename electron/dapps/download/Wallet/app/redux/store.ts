import { logger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';
import { subscribeOnEvents } from './events';

const configureStore = (initialState: any = {}) => {
  const middleware = [thunk, logger];

  const store = createStore(reducers, initialState, applyMiddleware(...middleware));
  //
  // if ((module as any).hot) {
  //   (module as any).hot.accept('./redux/reducers', () =>
  //     store.replaceReducer(require('./redux/reducers')) // eslint-disable-line global-require
  //   );
  // }
  subscribeOnEvents(store);

  return store;
};

export const store = configureStore();
