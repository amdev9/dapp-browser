import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Switch } from 'react-router';
// import {
//   HashRouter,
//   Route,
// } from "react-router-dom";
import { syncHistoryWithStore, ConnectedRouter } from 'react-router-redux';

import Main from './Main';
import Chat from './Chat';
import { configureStore, history } from '../redux/store';

interface IRootType {
  store: Store<any>; // Redux.Store<any>;
  isProduction: boolean;
}

const store = configureStore();

console.log('Co', ConnectedRouter)
console.log('Co', Switch)
console.log('Co', store, history)

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={Main}/>
            <Route path="chat" component={Chat}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
