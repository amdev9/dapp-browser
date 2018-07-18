require('rxjs'); 
const { combineEpics, ofType } = require('redux-observable');
const { delay, mapTo, map, of, merge, flatMap } = require('rxjs/operators');
const { 
  START_COUNTDOWN, 
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  INCREMENT_ASYNC, 
  CANCEL_INCREMENT_ASYNC 
} = require('../actions/counter');
const { 
  INTENT_OPEN_CHANNELS,
  OPEN_CHANNEL,
  OPEN_CHANNEL_SUCCESS, 
  OPEN_CHANNEL_FAILURE,
  BIND_OPEN_CHANNELS,
  BIND_OPEN_CHANNELS_DONE
} = require('../actions/channel');

const openChannel = uuid => ({ type: OPEN_CHANNEL, payload: { uuid: uuid } });
const bindChannels = () => ({ type: BIND_OPEN_CHANNELS });
const bindChannelsSuccess = () => ({ type: BIND_OPEN_CHANNELS_DONE });

const openChannelEpic = action$ => action$.pipe(
  ofType(INTENT_OPEN_CHANNELS),
  flatMap(action => {
    merge(
      of(openChannel(action.payload.uuidRec)), 
      of(openChannel(action.payload.uuidSend))
    ),
    //todo listen for receive OPEN_CHANNEL_SUCCESS -> takeUntil 2 OPEN_CHANNEL_SUCCESS?
    concat([
      of(bindChannels()),
      of(bindChannelsSuccess())
    ]),
    takeUntil(action$.pipe(
      ofType(OPEN_CHANNEL_FAILURE)
    ))
  })   
);

const rootEpic = combineEpics(
  openChannelEpic
);

module.exports = rootEpic;
