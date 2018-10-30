import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
console.log('ROOT', Root)
render(
    <Root/>,
  document.getElementById('Chat-IPFS-app-container')
);
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
