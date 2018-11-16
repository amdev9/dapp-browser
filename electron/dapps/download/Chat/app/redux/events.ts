const ArrayIO = require('array-io');

import { store } from './store';

const dappClass: ArrayIO.DappClass = ArrayIO.DappClass;

dappClass.on('openLink', (error, result) => {
  if (!error) {
    console.error('open link error', error);
  }
  console.log('OPEN LINK', result);
});
