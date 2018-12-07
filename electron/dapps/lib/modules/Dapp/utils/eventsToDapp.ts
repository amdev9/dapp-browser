import { Subject } from 'rxjs';
import { AnyAction } from 'redux';

import * as constants from '../../../redux/constants/index';
import Dapp from '../component';

interface EventActionMatch {
  actionType: string;
  event: any;
}

// Transform dispatched action to event from ArrayIO library
const matchActionToEvent: EventActionMatch[] = [
  { actionType: constants.DAPP_ACTION_OPEN_LINK, event: 'openLink' },
  { actionType: constants.DAPP_TRIGGER_ACTION, event: 'triggerAction' },
  { actionType: constants.DAPP_SET_FOCUS, event: 'dappSetFocus' },
  { actionType: constants.DAPP_RESET_FOCUS, event: 'dappResetFocus' },
];

const callEventOnAction = (action: AnyAction) => {
  matchActionToEvent
    .filter((eventAction) => eventAction.actionType === action.type)
    .forEach((eventAction) => Dapp.emit(eventAction.event, action.payload));
};

export default (storeObservable: Subject<AnyAction>) => {
  storeObservable.subscribe(callEventOnAction);
}
