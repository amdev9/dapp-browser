import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Counter from './components/Counter'
import store from './array-client';
 
render(
    <Provider store={store}>
      <Counter />
    </Provider>,
    document.getElementById('root')
);
