import 'rxjs'; 
import { combineEpics, ofType, Epic } from 'redux-observable';
import { of } from 'rxjs'; 
import { merge, concatMap } from 'rxjs/operators';
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

const openChannelEpic: Epic<Action> = action$ => action$.pipe(
  ofType(INTENT_OPEN_CHANNELS),
  concatMap( (action: Action) => of(openChannel(action.payload.uuidRec)).pipe(merge(of( openChannel(action.payload.uuidSend) )) ) )
  
//{ type: OPEN_CHANNEL, payload: { uuid: action.payload.uuidRec } }
  // .pipe(merge(of({ type: OPEN_CHANNEL, payload: { uuid: action.payload.uuidSend } })))




  // delay(1000),
  // mapTo(increment())  

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
