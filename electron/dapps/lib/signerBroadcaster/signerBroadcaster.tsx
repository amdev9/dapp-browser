import * as React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import { initDappSuccess } from '../array';
import { initApp } from './redux/store';

const rootElement = document.getElementById('Signer-Broadcaster-app-container');

if (rootElement) {
  render(<Root/>, rootElement, () => {
    initDappSuccess();
    initApp();
  });
}
