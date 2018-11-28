import * as React from 'react';
import { Provider } from 'react-redux';

import { store } from '../redux/store';
import Game from './Game';

export default function () {
  return (
    <div>
      <Provider store={store}>
        <Game/>
      </Provider>
    </div>
  );
}
