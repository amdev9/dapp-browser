import { logger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducers/index';
import history from './history';
import bindEvents from './bindEvents';

const configureStore = (initialState: any = {}) => {
  const middleware = [thunk, routerMiddleware(history), logger];

  const store = createStore(reducers, initialState, applyMiddleware(...middleware));
  //
  // if ((module as any).hot) {
  //   (module as any).hot.accept('./redux/reducers', () =>
  //     store.replaceReducer(require('./redux/reducers')) // eslint-disable-line global-require
  //   );
  // }
  bindEvents(store);

  return store;
};

export const store = configureStore();
