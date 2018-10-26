import { combineEpics } from 'redux-observable';

import openChannelEpic from './openChannelEpic';
import bindOpenChannelsEpic from './bindOpenChannelsEpic';
import openDappEpic from './openDappEpic';
import fileManagerEpic from './fileManagerEpic';
import ipfsStorageEpic from './ipfsStorageEpic';
import networkEpic from './networkEpic';
import keychainEpic from './keychainEpic';
import ipfsRoomEpic from './ipfsRoomEpic';
import marketEpic from './marketEpic';

// todo fix https://github.com/piotrwitek/react-redux-typescript-guide#async-flow

export default combineEpics(
  openChannelEpic,
  bindOpenChannelsEpic,
  openDappEpic,
  fileManagerEpic,
  ipfsStorageEpic,
  networkEpic,
  ipfsRoomEpic,
  keychainEpic,
  marketEpic,
);
 
