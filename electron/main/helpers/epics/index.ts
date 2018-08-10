import { combineEpics } from 'redux-observable';

import openChannelEpic from './openChannelEpic';
import bindOpenChannelsEpic from './bindOpenChannelsEpic';

export default combineEpics(
  openChannelEpic,
  bindOpenChannelsEpic
);
 
