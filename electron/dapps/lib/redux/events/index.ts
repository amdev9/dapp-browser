import { Subject } from 'rxjs';
import { AnyAction } from 'redux';

import eventsFromDapp from './eventsFromDapp';
import eventsToDapp from './eventsToDapp';

export default (storeObservable: Subject<AnyAction>, store: any) => {
  eventsFromDapp(store);
  eventsToDapp(storeObservable);
};
