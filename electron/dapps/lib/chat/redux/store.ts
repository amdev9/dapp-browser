import { logger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './reducers/index';

export const history = createHashHistory();

export const configureStore = (initialState: any = {}) => {
  const middleware = [thunk, routerMiddleware(history), logger];

  const store = createStore(reducers, initialState, applyMiddleware(...middleware));
  //
  // if ((module as any).hot) {
  //   (module as any).hot.accept('./redux/reducers', () =>
  //     store.replaceReducer(require('./redux/reducers')) // eslint-disable-line global-require
  //   );
  // }

  return store;
};
