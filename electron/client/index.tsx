import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';

import './assets/styles/main.sass';
import store, { isProduction } from './array-client';

render(
  <AppContainer>
    <Root store={store} isProduction={isProduction()}/>
  </AppContainer>,
  document.getElementById('root'),
);

if ((module as any).hot) {
  (module as any).hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store}   />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
