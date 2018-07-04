import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { 
  START_COUNTDOWN, 
  INCREMENT_COUNTER,
  INCREMENT_ASYNC, 
  CANCEL_INCREMENT_ASYNC 
} from '../actions/counter'; 
 
const startCountdownEpic = (action$) => {
 
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

export const rootEpic = combineEpics(
  startCountdownEpic
);
