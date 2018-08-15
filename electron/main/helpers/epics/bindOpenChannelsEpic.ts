import 'rxjs'; 
import { combineEpics, ofType, Epic } from 'redux-observable';
import { of } from 'rxjs'; 
import { merge, concatMap, mapTo, delay } from 'rxjs/operators';
import { ChannelAction } from '../actions/channel';

import { 
  INTENT_OPEN_CHANNELS,
  OPEN_CHANNEL,
  OPEN_CHANNEL_SUCCESS, 
  OPEN_CHANNEL_FAILURE,
  BIND_OPEN_CHANNELS,
  BIND_OPEN_CHANNELS_DONE,
  
} from '../constants';
 
const openChannel = (uuid: string) => ({ type: OPEN_CHANNEL, payload: { uuid: uuid } });
// const bindChannels = () => ({ type: BIND_OPEN_CHANNELS });
// const bindChannelsSuccess = () => ({ type: BIND_OPEN_CHANNELS_DONE });

const bindOpenChannelsEpic: Epic<ChannelAction> = action$ => action$.pipe(
  ofType(OPEN_CHANNEL_SUCCESS),
  mapTo({ type: BIND_OPEN_CHANNELS }), //todo signal to start binding
  mapTo({ type: BIND_OPEN_CHANNELS_DONE })
);

export default bindOpenChannelsEpic;
