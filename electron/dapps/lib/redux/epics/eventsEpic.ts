import 'rxjs';
import { AnyAction } from 'redux';
import { combineEpics, ofType, Epic } from 'redux-observable';
import { tap, ignoreElements } from 'rxjs/operators';

import * as constants from '../constants';
import Dapp from '../../classes/Dapp';

interface EventActionMatch {
  actionType: string;
  event: string;
}

const callOnActionEpic = (actionType: string, event: string, callback: (action: AnyAction) => void): Epic<any> => {
  return action$ => action$.pipe(
    ofType(actionType),
    tap(callback),
    ignoreElements(),
  );
};

const emitEventOnActionEpic = (actionType: string, event: string) => {
  return callOnActionEpic(actionType, event, action => Dapp.emit(event, action.payload));
};

// Transform dispatched action to event from ArrayIO library
const matchActionToEvent: EventActionMatch[] = [
  { actionType: constants.DAPP_ACTION_OPEN_LINK, event: 'openLink' },
];

const eventEpics = matchActionToEvent.map(match => emitEventOnActionEpic(match.actionType, match.event));

export default combineEpics(...eventEpics);
