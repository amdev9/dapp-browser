import 'rxjs'; 
import {  ofType, Epic } from 'redux-observable';
import { of } from 'rxjs'; 
import { merge, concatMap } from 'rxjs/operators';
import { 
  TOGGLE_APP_HOME,
  ADD_APP_ITEM
} from '../constants';
import {  AppsManager } from '../AppsManager';
import { addAppItem, switchDapp } from '../actions/client';



const openDappEpic: Epic<any> = action$ => action$.pipe(
  ofType(TOGGLE_APP_HOME), //@todo get appName from payload
  concatMap( (action: any) => of(
      addAppItem(AppsManager.getAppItem(action.payload.targetDappName))
    )
    .pipe(
      merge(
        of(
          switchDapp(action.payload.targetDappName) 
        )
      )  
    )
  )
);

export default openDappEpic;
