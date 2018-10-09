import 'rxjs'; 
import { combineEpics, ofType, Epic } from 'redux-observable';
import { of } from 'rxjs'; 
import { merge, concatMap, mapTo, delay } from 'rxjs/operators';
import { ChannelAction } from '../actions/channel';

import * as constants from '../constants';
import { ChannelResolver } from '../ChannelResolver'; 


const acceptChannel = (channelId: string) => ({ type: constants.ACCEPT_CHANNEL_DATA_PASS, payload: { channelId: channelId } });

const componentChannelEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.INTENT_CHANNEL_DATA_PASS), 
  concatMap( 
    (action: any) => of(
      acceptChannel(ChannelResolver.resolveComponentChannel(action.payload.component)) // ==> return channelId and save to memory map
    )
  )
);

export default componentChannelEpic;
