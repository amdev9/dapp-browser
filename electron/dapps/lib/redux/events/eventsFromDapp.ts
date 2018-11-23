import { AnyAction } from 'redux';

import Dapp from '../../classes/Dapp';
import * as eventsActions from '../actions/events';

interface ActionEventMatch {
  action: (...args: any[]) => AnyAction;
  event: any;
}

// Transform dispatched action to event from ArrayIO library
const matchActionToEvent: ActionEventMatch[] = [
  { event: 'setTrayCounter', action: (counter: number) => eventsActions.setTrayCounter(counter) },
];

export default (store: any) => {
  matchActionToEvent.forEach(({ action, event }) => {
    Dapp.on(event, (...args: any[]) => {
      store.dispatch(action(...args));
    });
  });
};
