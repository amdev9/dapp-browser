import 'rxjs'; 
import {  ofType, Epic } from 'redux-observable';
import { of } from 'rxjs'; 
import { mapTo, map, mergeMap, concatMap } from 'rxjs/operators';
 

import { 
  TOGGLE_APP_HOME,
  ADD_APP_ITEM
} from '../constants';
  
import { AppItem, AppsManager } from '../AppsManager';
 

const addAppItem = (appItem: AppItem) => ({ 
  type: ADD_APP_ITEM, 
  payload: {
    item: appItem
  } 
});


const openDappEpic: Epic<any> = action$ => action$.pipe(
  ofType(TOGGLE_APP_HOME), //@todo get appName from payload
  concatMap( (action: any) => of(
    addAppItem(AppsManager.getAppItem(action.payload.dappName))
  ))
);

export default openDappEpic;
