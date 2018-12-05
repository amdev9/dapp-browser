import { combineEpics } from 'redux-observable';

import openChannelEpic from './openChannelEpic';
import bindOpenChannelsEpic from './bindOpenChannelsEpic';
import clientEpic from './clientEpic';
import networkEpic from './networkEpic';
import keychainEpic from './keychainEpic';
import marketEpic from './marketEpic';
import orbitDBEpic from './orbitDBEpic';
import storageEpic from './storageEpic';
import httpProtocolEpic from './httpProtocolEpic';
import appMainEpic from './appMainEpic';
import permissionManagerEpic from './permissionManagerEpic';
import notificationsEpic from './notificationsEpic';

import { epic as ipfsStorageEpic } from '../ducks/IpfsStorage';
import { epic as ipfsRoomEpic } from '../ducks/IpfsRoom';
import { epic as fileManagerEpic } from '../ducks/FileManager';

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
  notificationsEpic,
);
