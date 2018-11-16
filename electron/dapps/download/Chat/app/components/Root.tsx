import * as React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ConnectedRouter } from 'react-router-redux';

import Main from './Main/index';
import Chat from './Chat/index';
import { store } from '../redux/store';
import history from '../redux/history';

export default function () {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/*<TransitionGroup>*/}
        {/*<CSSTransition*/}
        {/*timeout={300}*/}
        {/*classNames="fade"*/}
        {/*>*/}
        <Switch>
          <Route path="/chat" component={Chat}/>
          <Route path="/" component={Main}/>
        </Switch>
        {/*</CSSTransition>*/}
        {/*</TransitionGroup>*/}
      </ConnectedRouter>
    </Provider>
  );
}
