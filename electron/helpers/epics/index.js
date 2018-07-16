

// add epic INTENT_OPEN_CHANNELS (targetDapp, channelProposal) (resolve id of dapp, send push event) 
// - if resonse from subscribed dapp == OK
// - at main find channelIdSend, channelIdReceive
// - -> OPEN_CHANNEL(channelIdSend), OPEN_CHANNEL(channelIdReceive) -> when both opened succesfully -> BIND_OPEN_CHANNELS(channelIdSend, channelIdReceive)
// - -> BIND_OPEN_CHANNELS_DONE (action signal for ipcCommunicator object start accept data transfer
// - takeUntil CANCEL_OPENED_CHANNEL if one of channels going down
// * simplify for first version: dapp receiver OK by default
 
require('rxjs');
 
const { combineEpics, ofType } = require('redux-observable');
const { delay, mapTo } = require('rxjs/operators');

const { 
  START_COUNTDOWN, 
  INCREMENT_COUNTER,
  INCREMENT_ASYNC, 
  CANCEL_INCREMENT_ASYNC 
} = require('../actions/counter');
 
const { OPEN_CHANNEL, INTENT_OPEN_CHANNELS } = require('../actions/channel');

// const startCountdownEpic = (action$) => {
  
//   // INTENT_OPEN_CHANNELS
//   // payload = define channelIds by nameofapp === inject globalUUIDList into epic 
//   // https://redux-observable.js.org/docs/recipes/InjectingDependenciesIntoEpics.html
//   /*   
//     //next move to redux-observable 1.0.0
//     // https://github.com/redux-observable/redux-observable/blob/master/MIGRATION.md
    
//     https://medium.com/kevin-salters-blog/epic-middleware-in-redux-e4385b6ff7c6   */

//   return action$.ofType(INTENT_OPEN_CHANNELS).mapTo(action => { //todo add payload https://github.com/redux-observable/redux-observable/blob/master/docs/basics/Epics.md#a-real-world-example
//     return { type: OPEN_CHANNEL, payload: { uuid: action.payload.uuid } } 
//   })
       
// };

const increment = () => ({ type: INCREMENT_COUNTER });
const startCountdownEpic = action$ => action$.pipe(
  ofType(INTENT_OPEN_CHANNELS),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo(increment())
);

const rootEpic = combineEpics(
  startCountdownEpic
);

module.exports = rootEpic;
