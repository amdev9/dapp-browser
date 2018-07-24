import 'rxjs'; 
import { combineEpics, ofType, Epic } from 'redux-observable';
import { delay, mapTo, map, merge, flatMap } from 'rxjs/operators';
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
  BIND_OPEN_CHANNELS_DONE
} from '../actions/channel';
 

import { Action } from 'redux';
import { increment } from '../actions/counter';
 
// const openChannel = uuid => ({ type: OPEN_CHANNEL, payload: { uuid: uuid } });
// const bindChannels = () => ({ type: BIND_OPEN_CHANNELS });
// const bindChannelsSuccess = () => ({ type: BIND_OPEN_CHANNELS_DONE });

const openChannelEpic: Epic<Action> = action$ => action$.pipe(
  ofType(INTENT_OPEN_CHANNELS),
  delay(1000),
  mapTo(increment())

  // flatMap(action => {
  //   merge(
  //     of(openChannel(action.payload.uuidRec)), 
  //     of(openChannel(action.payload.uuidSend))
  //   ),
  //   //next todo listen for receive OPEN_CHANNEL_SUCCESS from sender and receiver
  //   concat([
  //     of(bindChannels()),
  //     //next todo listen for successfull channel binding
  //     of(bindChannelsSuccess())
  //   ]),
  //   takeUntil(action$.pipe(
  //     ofType(OPEN_CHANNEL_FAILURE)
  //   ))
  // })   
);

export default [
  openChannelEpic
];
