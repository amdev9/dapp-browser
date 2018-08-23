import 'rxjs'; 
import {  ofType, Epic } from 'redux-observable';
import { mapTo } from 'rxjs/operators';
import { ChannelAction } from '../actions/channel';

import { 
  TOGGLE_APP_HOME,
  ADD_APP_ITEM
} from '../constants';
  
const openDappEpic: Epic<ChannelAction> = action$ => action$.pipe(
  ofType(TOGGLE_APP_HOME), //@todo get appName from payload
  mapTo({ type: ADD_APP_ITEM }) // by appName resolve TrayItem
);

export default openDappEpic;
