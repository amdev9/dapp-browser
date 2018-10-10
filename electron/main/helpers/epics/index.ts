import { combineEpics } from 'redux-observable';

import openChannelEpic from './openChannelEpic';
import bindOpenChannelsEpic from './bindOpenChannelsEpic';
import openDappEpic from './openDappEpic';
import componentChannelEpic from './componentChannelEpic';
import fileManagerEpic from './fileManagerEpic';

// todo fix https://github.com/piotrwitek/react-redux-typescript-guide#async-flow

export default combineEpics(
  openChannelEpic,
  bindOpenChannelsEpic,
  openDappEpic,
  componentChannelEpic,
  fileManagerEpic,
);
 
