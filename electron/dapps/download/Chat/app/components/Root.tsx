import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import ChatScreen from './ChatScreen';
import { store } from '../redux/store';
import history from '../redux/history';

export default function () {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={ChatScreen}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}
