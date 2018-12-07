import { AnyAction } from 'redux';

import Dapp from '../component';
import { actions as dappActions } from 'MainApp/modules/Dapp';

interface ActionEventMatch {
  action: (...args: any[]) => AnyAction;
  event: any;
}

// Transform dispatched action to event from ArrayIO library
const matchActionToEvent: ActionEventMatch[] = [
  { event: 'setTrayCounter', action: (counter: number) => dappActions.setTrayCounter(counter) },
];

export default (store: any) => {
  matchActionToEvent.forEach(({ action, event }) => {
    Dapp.on(event, (...args: any[]) => {
      store.dispatch(action(...args));
    });
  });
};
