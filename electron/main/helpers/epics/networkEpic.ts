import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';

import { NetworkAPI } from '../systemComponents/Network';
import * as networkActions from '../actions/network';
import * as constants from '../constants';

let networkInstance: NetworkAPI;

try {
  networkInstance = new NetworkAPI();
} catch (error) {
  console.log('Error creating NetworkAPI instance', error);
}

const networkGetBlockEpic: Epic<AnyAction> = action$ => action$.pipe( // @todo fix action type
  ofType(constants.NETWORK_GET_BLOCK),
  mergeMap(async (action) => {
    try {
      const block = await networkInstance.getBlock();
      return networkActions.getBlockSuccess(JSON.stringify(block), action.meta.sourceUUID);
    } catch (error) {
      return networkActions.getBlockFailure(error, action.meta.sourceUUID);
    }
  }),
);

const networkGetWitnessEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.NETWORK_GET_WITNESS),
  mergeMap(async (action) => {
    try {
      const witnessId = action.payload.witnessId;
      const witness = await networkInstance.getWitness(witnessId);
      return networkActions.getWitnessSuccess(JSON.stringify(witness), action.meta.sourceUUID);
    } catch (error) {
      return networkActions.getWitnessFailure(error, action.meta.sourceUUID);
    }
  }),
);

const networkSubscribeEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.NETWORK_SUBSCRIBE),
  mergeMap(async (action) => {
    try {
      networkInstance.addSubscriber(action.meta.sourceUUID);
      return networkActions.subscribeSuccess(action.meta.sourceUUID);
    } catch (error) {
      return networkActions.subscribeFailure(error, action.meta.sourceUUID);
    }
  }),
);

const networkUnsubscribeEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.NETWORK_UNSUBSCRIBE),
  mergeMap(async (action) => {
    try {
      networkInstance.removeSubscriber(action.meta.sourceUUID);
      return networkActions.unsubscribeSuccess(action.meta.sourceUUID);
    } catch (error) {
      return networkActions.unsubscribeFailure(error, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  networkGetBlockEpic,
  networkGetWitnessEpic,
  networkSubscribeEpic,
  networkUnsubscribeEpic,
);
