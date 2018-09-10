import * as React from 'react';
import { render } from 'react-dom';
import { PermissionLayout } from './components/PermissionLayout';
 
render(
  // pass store -> only forwardToMain method works
  <PermissionLayout />,
  document.getElementById('root')
);
 
