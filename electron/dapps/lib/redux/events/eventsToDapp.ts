import { Subject } from 'rxjs';
import { AnyAction } from 'redux';

import * as constants from '../constants';
import Dapp from '../../classes/Dapp';

interface EventActionMatch {
  actionType: string;
  event: any;
}

// Transform dispatched action to event from ArrayIO library
const matchActionToEvent: EventActionMatch[] = [
  { actionType: constants.DAPP_ACTION_OPEN_LINK, event: 'openLink' },
  { actionType: constants.DAPP_TRIGGER_ACTION, event: 'triggerAction' },
];

const callEventOnAction = (action: AnyAction) => {
  matchActionToEvent
    .filter((eventAction) => eventAction.actionType === action.type)
    .forEach((eventAction) => Dapp.emit(eventAction.event, action.payload));
};

export default (storeObservable: Subject<AnyAction>) => {
  storeObservable.subscribe(callEventOnAction);
}
