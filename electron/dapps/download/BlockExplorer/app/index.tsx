import * as React from 'react';
import { render } from 'react-dom';
import Root from './js/components/Root';

const rootElement = document.getElementById('Block-explorer-app');

if (rootElement) {
  render(<Root />, rootElement);
}
