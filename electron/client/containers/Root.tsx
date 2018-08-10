import * as React from 'react';
import * as Redux from 'react-redux';
 

import { Store } from 'redux';

import { Provider } from 'react-redux';
import App from '../components/App';

interface IRootType {
  store: Store<any>; // Redux.Store<any>;
};

export default function Root({ store }: IRootType) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}