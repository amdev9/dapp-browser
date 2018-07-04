

//todo add epic INTENT_OPEN_CHANNELS (nameOfDappReceive, channelProposal) (resolve id of dapp, send push event) 
// - if resonse from subscribed dapp == OK
// - at main find channelIdSend, channelIdReceive
// - -> OPEN_CHANNEL(channelIdSend), OPEN_CHANNEL(channelIdReceive) -> when both opened succesfully -> BIND_OPEN_CHANNELS(channelIdSend, channelIdReceive)
// - -> BIND_OPEN_CHANNELS_DONE (action signal for ipcCommunicator object start accept data transfer
// - takeUntil CANCEL_OPENED_CHANNEL if one of channels going down
// * simplify for first version: dapp receiver OK by default
 
require('rxjs');
const { Observable } = require('rxjs/Observable');
const { combineEpics } = require('redux-observable');
const { 
  START_COUNTDOWN, 
  INCREMENT_COUNTER,
  INCREMENT_ASYNC, 
  CANCEL_INCREMENT_ASYNC 
} = require('../actions/counter');; 
 
const startCountdownEpic = (action$) => {
  
  // INTENT_OPEN_CHANNELS
  // payload = define channelIds by nameofapp === inject globalUUIDList into epic 
  // https://redux-observable.js.org/docs/recipes/InjectingDependenciesIntoEpics.html
  return action$.ofType(START_COUNTDOWN).switchMap(q => {

    const start = 5;

    /*    

    //next todo move to redux-observable 1.0.0
    // https://github.com/redux-observable/redux-observable/blob/master/MIGRATION.md
    
    https://medium.com/kevin-salters-blog/epic-middleware-in-redux-e4385b6ff7c6


     * A countdown generates a 5,4,3,2,1,0,-1 series of events,
     * where all are separated by 1 second but the last one (-1), that is only
     * 10 milliseconds away from 0.
     * This way, when the counter hit 0 the "INCREMENT_ASYNC" is dispatched,
     * so the counter becomes 0 again and, when it dispatches -1
     * (10 milliseconds later), the actual increment is dispatched at last.
     */
    return Observable
      .timer(0, 1000)
      .mergeMap(tick => {
        //when we reach 5 we schedule 5 and 6.
        if (tick === start) {
          return Observable.timer(0, 10).mergeMap(y => Observable.of(start, start + 1))
        }
        else {
          return Observable.of(tick)
        }
      })
      .map(i => start - i)
      .take(start + 2)
      // supports cancellation
      .takeUntil(action$.ofType(CANCEL_INCREMENT_ASYNC))
      .map(seconds => {
        // actual increment action
        if (seconds === -1) {
          return { type: INCREMENT_COUNTER }
        }
        // increment async action
        else {
          return { type: INCREMENT_ASYNC, value: seconds }
        }
      });
  });
};

/**
 * there is only one epic.
 */

const rootEpic = combineEpics(
  startCountdownEpic
);

module.exports = rootEpic;
