import { Subject } from 'rxjs';
import { AnyAction } from 'redux';

import eventsFromDapp from './eventsFromDapp';
import eventsToDapp from './eventsToDapp';
import * as actions from '../actions/channel';

export default (storeObservable: Subject<AnyAction>, store: any) => {
  document.addEventListener('DOMContentLoaded', () => {
    store.dispatch(actions.dappContentLoaded());
  });
  eventsFromDapp(store);
  eventsToDapp(storeObservable);
};
