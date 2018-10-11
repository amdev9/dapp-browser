import 'rxjs'; 
import { combineEpics, ofType, Epic } from 'redux-observable';
import { of } from 'rxjs'; 
import { merge, concatMap } from 'rxjs/operators';

import * as constants from '../constants';
import { ActionType } from 'typesafe-actions';
import { ChannelAction } from '../reducers/channel';
import { intentOpenChannel, openChannel } from '../actions/channel';
export type intentOpenChannelAction = ActionType<typeof intentOpenChannel>;


const openChannelEpic: Epic<ChannelAction> = action$ => action$.pipe(
  ofType(constants.INTENT_OPEN_CHANNELS),
  concatMap(
    (action: intentOpenChannelAction) => of(openChannel(action.payload.uuidRec)).pipe(
        merge(
          of( 
            openChannel(action.payload.uuidSend) 
          )
        ) 
      ) 
    )
);

export default openChannelEpic;
