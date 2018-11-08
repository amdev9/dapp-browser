import { logger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';

import * as actions from './actions'
import reducers from './reducers/index';
import rootEpic from './epics';
import history from './history';

const epicMiddleware = createEpicMiddleware();

const configureStore = (initialState: any = {}) => {
  const middleware = [thunk, epicMiddleware, routerMiddleware(history), logger];

  const store = createStore(reducers, initialState, applyMiddleware(...middleware));
  //
  // if ((module as any).hot) {
  //   (module as any).hot.accept('./redux/reducers', () =>
  //     store.replaceReducer(require('./redux/reducers')) // eslint-disable-line global-require
  //   );
  // }
  epicMiddleware.run(rootEpic);

  return store;
};

export const store = configureStore();

export const initApp = () => store.dispatch(actions.initApp())
