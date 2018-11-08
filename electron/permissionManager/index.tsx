import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { PermissionLayoutConnected } from './components/PermissionLayout';

import store, { getPermissions, getAppName } from './array-permission';
import './assets/styles/main.css';
 
render(
  <Provider store={store}>
    <PermissionLayoutConnected permissions={getPermissions} appName={getAppName}/>
  </Provider>,
  document.getElementById('root'),
);
