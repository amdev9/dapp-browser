import * as React from 'react';
import { applyMiddleware, createStore } from "redux";
import { render } from 'react-dom';

import { permission } from './redux/reducers/permission'
import { Permission } from './redux/reducers/state';

import { Provider } from 'react-redux';
import App from './components/App';
import { PermissionLayout } from './components/PermissionLayout';

//import Root from './components/Root';
// const store = createStore(permission);

import store from "./array-permission";

const list: Permission[] = ["ipfs", "storage"];

render(
  // <Root store={store} />,   
  <Provider store={store}> 
    <App>
      <PermissionLayout permissions={list}/>
    </App>
  </Provider>,
  document.getElementById('root')
);
 
