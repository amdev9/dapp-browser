import * as React from 'react';
import { render } from 'react-dom';
import { PermissionLayout } from './components/PermissionLayout';
 

// import store from './permissions';

render(
  // pass store -> only forwardToMain method works
  <PermissionLayout permissions={["ipfs", "storage"]}/>,
  document.getElementById('root')
);
 
