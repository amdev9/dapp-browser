import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import App from '../components/App';
import Layout from '../components/Layout';

interface IRootType {
  store: Store<any>; // Redux.Store<any>;
  isProduction: boolean
}

export default function Root({ store, isProduction }: IRootType) {
  return (
    <Provider store={store}>
      <App>
        <Layout isProduction={isProduction} />
      </App>
    </Provider>
  );
}
