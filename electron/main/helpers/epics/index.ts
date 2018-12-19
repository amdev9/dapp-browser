import { combineEpics } from 'redux-observable';

import openChannelEpic from './openChannelEpic';
import bindOpenChannelsEpic from './bindOpenChannelsEpic';
import clientEpic from './clientEpic';
import networkEpic from './networkEpic';
import keychainEpic from './keychainEpic';
import ethereumEpic from './ethereumEpic';
import appMainEpic from './appMainEpic';
import permissionManagerEpic from './permissionManagerEpic';

import { epics as storageEpic } from '../../modules/Storage';
import { epics as dappEpic } from '../../modules/Dapp';
import { epics as appsManagerEpic } from '../../modules/AppsManager';
import { epics as orbitDBEpic } from '../../modules/OrbitDb';
import { epics as notificationsEpic } from '../../modules/Notification';
import { epics as ipfsStorageEpic } from '../../modules/IpfsStorage';
import { epics as ipfsRoomEpic } from '../../modules/IpfsRoom';
import { epics as fileManagerEpic } from '../../modules/FileManager';

// todo fix https://github.com/piotrwitek/react-redux-typescript-guide#async-flow

export default combineEpics(
  appMainEpic,
  dappEpic,
  appsManagerEpic,
  openChannelEpic,
  bindOpenChannelsEpic,
  clientEpic,
  fileManagerEpic,
  ipfsStorageEpic,
  networkEpic,
  ipfsRoomEpic,
  keychainEpic,
  orbitDBEpic,
  storageEpic,
  permissionManagerEpic,
  notificationsEpic,
  ethereumEpic,
);
