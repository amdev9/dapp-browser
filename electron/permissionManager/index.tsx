import * as React from 'react';
import { applyMiddleware, createStore } from "redux";
import { render } from 'react-dom';

import { permission } from './redux/reducers/permission'
import { Permission } from './redux/reducers/state';

import { Provider } from 'react-redux';
 
import { PermissionLayoutConnected } from './components/PermissionLayout';

//import Root from './components/Root';
// const store = createStore(permission);

import store from "./array-permission";

const list: string[] = ["ipfs", "storage"];

render(
  // <Root store={store} />,   
  <Provider store={store}> 
    <PermissionLayoutConnected permissions={list}/>
  </Provider>,
  document.getElementById('root')
);
 
