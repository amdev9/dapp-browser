import 'rxjs'; 
import { combineEpics, ofType, Epic } from 'redux-observable';
import { of } from 'rxjs'; 
import { merge, concatMap, mapTo, delay } from 'rxjs/operators';
import { 
  START_COUNTDOWN, 
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  INCREMENT_ASYNC, 
  CANCEL_INCREMENT_ASYNC 
} from '../actions/counter';

import { 
  INTENT_OPEN_CHANNELS,
  OPEN_CHANNEL,
  OPEN_CHANNEL_SUCCESS, 
  OPEN_CHANNEL_FAILURE,
  BIND_OPEN_CHANNELS,
  BIND_OPEN_CHANNELS_DONE,
  Action
} from '../actions/channel';
 

import { increment } from '../actions/counter';
 
const openChannel = (uuid: string) => ({ type: OPEN_CHANNEL, payload: { uuid: uuid } });
// const bindChannels = () => ({ type: BIND_OPEN_CHANNELS });
// const bindChannelsSuccess = () => ({ type: BIND_OPEN_CHANNELS_DONE });

const bindOpenChannelsEpic: Epic<Action> = action$ => action$.pipe(
  ofType(OPEN_CHANNEL_SUCCESS),
  mapTo({ type: BIND_OPEN_CHANNELS }), //todo signal to start binding
  // delay(1000),
  mapTo({ type: BIND_OPEN_CHANNELS_DONE })
);

export default bindOpenChannelsEpic;
