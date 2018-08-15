import 'rxjs'; 
import { combineEpics, ofType, Epic } from 'redux-observable';
import { of } from 'rxjs'; 
import { merge, concatMap } from 'rxjs/operators';

import { 
  INTENT_OPEN_CHANNELS,
  OPEN_CHANNEL,
  OPEN_CHANNEL_SUCCESS, 
  OPEN_CHANNEL_FAILURE,
  BIND_OPEN_CHANNELS,
  BIND_OPEN_CHANNELS_DONE,
} from '../constants';
 
import { ChannelAction } from '../actions/channel';
 
const openChannel = (uuid: string) => ({ type: OPEN_CHANNEL, payload: { uuid: uuid } });
// const bindChannels = () => ({ type: BIND_OPEN_CHANNELS });
// const bindChannelsSuccess = () => ({ type: BIND_OPEN_CHANNELS_DONE });

const openChannelEpic: Epic<ChannelAction> = action$ => action$.pipe(
  ofType(INTENT_OPEN_CHANNELS),
  concatMap( (action: ChannelAction) => of(openChannel(action.payload.uuidRec)).pipe(merge(of( openChannel(action.payload.uuidSend) )) ) )
);

export default openChannelEpic;
