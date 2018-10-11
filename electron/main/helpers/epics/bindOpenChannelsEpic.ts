import 'rxjs'; 
import { combineEpics, ofType, Epic } from 'redux-observable';
import { of } from 'rxjs'; 
import { merge, concatMap, mapTo, delay } from 'rxjs/operators';
import { ChannelAction } from '../reducers/channel';

import * as constants from '../constants';
 
import { bindOpenChannels, bindOpenChannelsDone } from '../actions/channel';

const bindOpenChannelsEpic: Epic<ChannelAction> = action$ => action$.pipe(
  ofType(constants.OPEN_CHANNEL_SUCCESS),
  mapTo(bindOpenChannels()), //todo signal to start binding
  mapTo(bindOpenChannelsDone())
);

export default bindOpenChannelsEpic;
