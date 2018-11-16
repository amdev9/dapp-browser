import { combineEpics, Epic } from 'redux-observable';

import openChannelEpic from './openChannelEpic';
import bindOpenChannelsEpic from './bindOpenChannelsEpic';
import clientEpic from './clientEpic';
import fileManagerEpic from './fileManagerEpic';
import ipfsStorageEpic from './ipfsStorageEpic';
import networkEpic from './networkEpic';
import keychainEpic from './keychainEpic';
import ipfsRoomEpic from './ipfsRoomEpic';
import marketEpic from './marketEpic';
import orbitDBEpic from './orbitDBEpic';
import storageEpic from './storageEpic';
import httpProtocolEpic from './httpProtocolEpic';
import appMainEpic from './appMainEpic';
import permissionManagerEpic from './permissionManagerEpic';

// todo fix https://github.com/piotrwitek/react-redux-typescript-guide#async-flow

export default combineEpics(
  appMainEpic,
  openChannelEpic,
  bindOpenChannelsEpic,
  clientEpic,
  fileManagerEpic,
  ipfsStorageEpic,
  networkEpic,
  ipfsRoomEpic,
  keychainEpic,
  marketEpic,
  orbitDBEpic,
  storageEpic,
  httpProtocolEpic,
  permissionManagerEpic,
);
