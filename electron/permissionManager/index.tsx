import * as React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import { store } from './permissions';

render(
  <Root store={store} />, 
  document.getElementById('root')
);
 
