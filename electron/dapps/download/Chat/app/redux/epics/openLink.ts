import { combineEpics, Epic, ofType } from 'redux-observable';
import { map, tap } from 'rxjs/operators';

import * as constants from '../constants/index';
import * as actions from '../actions/index';

const openLinkEpic: Epic<any> = (action$, state$) => action$.pipe(
  ofType(constants.DAPP_ACTION_OPEN_LINK),
  map((action) => {
    const [roomName] = action.payload.params;
    console.log('state$', state$.value.main.selectedRoom)

    return actions.onSubmitMainFormThunk(roomName);
  }),
);

export default combineEpics(
  openLinkEpic,
);
