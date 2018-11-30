import * as React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from '../redux/store';
import Game from './Game';


export default function () {
  return (
    <Provider store={store}>
      <Game/>
    </Provider>
  );
}
