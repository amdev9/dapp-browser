import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { PermissionLayoutConnected } from './components/PermissionLayout';

import store from "./array-permission";
import { getPermissions, getAppName } from "./array-permission";

render(
  <Provider store={store}>
    <PermissionLayoutConnected permissions={getPermissions} appName={getAppName}/>
  </Provider>,
  document.getElementById('root')
);
 
