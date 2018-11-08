import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import { initDappSuccess } from '../array';
import { initApp } from './redux/store';

const rootElement = document.getElementById('Chat-IPFS-app-container');

if (rootElement) {
  render(<Root/>, rootElement, () => {
    initDappSuccess();
    initApp();
  });
}
//
// if ((module as any).hot) {
//   (module as any).hot.accept('./components/Root', () => {
//     const NextRoot = require('./components/Root').default;
//     render(
//       <AppContainer>
//         <NextRoot/>
//       </AppContainer>,
//       document.getElementById('Chat-IPFS-app-container')
//     );
//   });
// }
