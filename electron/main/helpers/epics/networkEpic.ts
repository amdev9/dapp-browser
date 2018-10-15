import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { Network } from '../Network'
import * as networkActions from '../actions/network';
import * as constants from '../constants';


const networkInstance = new Network();

const networkGetBlockEpic: Epic<AnyAction> = action$ => action$.pipe( //@todo fix action type
  ofType(constants.NETWORK_GET_BLOCK),
  switchMap(async (action) => {
    try {
      const block = await networkInstance.getBlock();
      return networkActions.getBlockSuccess(block, action.meta.sourceUUID)
    } catch(error){
      return networkActions.getBlockFailure(error, action.meta.sourceUUID)
    }
  }),
);

export default combineEpics(
  networkGetBlockEpic,
)
