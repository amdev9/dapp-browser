import { Subject } from 'rxjs';
import { AnyAction } from 'redux';

import eventsFromDapp from './eventsFromDapp';
import eventsToDapp from './eventsToDapp';
import * as mainActions from 'MainApp/modules/Dapp';

export default (storeObservable: Subject<AnyAction>, store: any) => {
  document.addEventListener('DOMContentLoaded', () => {
    store.dispatch(mainActions.dappContentLoaded());
  });
  eventsFromDapp(store);
  eventsToDapp(storeObservable);
};
