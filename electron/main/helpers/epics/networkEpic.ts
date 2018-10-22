import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { NetworkAPI } from '../Network';
import * as networkActions from '../actions/network';
import * as constants from '../constants';

const networkGetBlockEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.NETWORK_GET_BLOCK),
  switchMap(async (action) => {
    try {
      const networkInstance = new NetworkAPI();
      networkInstance.init();
      const block = await networkInstance.getBlock();
      // networkInstance.addListener(() => {
      //   console.log("Network instance listener triggered");
      // });
      return networkActions.getBlockSuccess(JSON.stringify(block), action.meta.sourceUUID);
    } catch (error) {
      return networkActions.getBlockFailure(error, action.meta.sourceUUID);
    }
  }),
);

const networkGetWitnessEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.NETWORK_GET_WITNESS),
  switchMap(async (action) => {
    try {
      const networkInstance = new NetworkAPI();
      networkInstance.init();
      const witness = await networkInstance.getWitness('b6b83a593686087531ce581540564d20b2f75ff9879e9dd2eccfa9a79744b949');
      console.log('networkGetWitnessEpic witness: ', witness);
      return networkActions.getWitnessSuccess('stub_witness', action.meta.sourceUUID);
    } catch (error) {
      return networkActions.getWitnessFailure(error, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  networkGetBlockEpic,
  networkGetWitnessEpic,
);
