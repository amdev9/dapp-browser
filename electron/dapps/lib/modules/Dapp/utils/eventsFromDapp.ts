import { AnyAction } from 'redux';

import Dapp from '../component';
import * as mainActions from 'MainApp/modules/Dapp/actions';

interface ActionEventMatch {
  action: (...args: any[]) => AnyAction;
  event: any;
}

// Transform dispatched action to event from DappIO library
const matchActionToEvent: ActionEventMatch[] = [
  { event: 'setTrayCounter', action: (counter: number) => mainActions.setTrayCounter(counter) },
];

export default (store: any) => {
  matchActionToEvent.forEach(({ action, event }) => {
    Dapp.on(event, (...args: any[]) => {
      store.dispatch(action(...args));
    });
  });
};
