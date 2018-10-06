import * as React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import App from '../components/App';

interface IRootType {
  store: Store<any>; // Redux.Store<any>;
  isProduction: boolean
}

export default function Root({ store, isProduction }: IRootType) {
  return (
    <Provider store={store}>
      <Router>
        <App isProduction={isProduction} />
      </Router>
    </Provider>
  );
}
