import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import Main from './Main/index';
import Chat from './Chat/index';
import { store } from '../redux/store';
import history from '../redux/history';

export default function () {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/chat" component={Chat}/>
          <Route path="/" component={Main}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}
