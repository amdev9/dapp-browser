import { Subject } from 'rxjs';
import { AnyAction } from 'redux';

import * as mainConstants from 'MainApp/modules/Dapp/constants';
import Dapp from '../component';

interface EventActionMatch {
  actionType: string;
  event: any;
}

// Transform dispatched action to event from DappIO library
const matchActionToEvent: EventActionMatch[] = [
  { actionType: mainConstants.DAPP_ACTION_OPEN_LINK, event: 'openLink' },
  { actionType: mainConstants.DAPP_TRIGGER_ACTION, event: 'triggerAction' },
  { actionType: mainConstants.DAPP_SET_FOCUS, event: 'dappSetFocus' },
  { actionType: mainConstants.DAPP_RESET_FOCUS, event: 'dappResetFocus' },
];

const callEventOnAction = (action: AnyAction) => {
  matchActionToEvent
    .filter((eventAction) => eventAction.actionType === action.type)
    .forEach((eventAction) => Dapp.emit(eventAction.event, action.payload));
};

export default (storeObservable: Subject<AnyAction>) => {
  storeObservable.subscribe(callEventOnAction);
}
