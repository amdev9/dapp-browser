import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { Ethereum } from '../systemComponents/Ethereum';
import * as ethereumActions from '../actions/ethereum';
import * as constants from '../constants';

const etheriumBuildTransactionEpic: Epic<AnyAction> = (action$, state$) => action$.pipe( // @todo fix action type
  ofType(constants.ETHEREUM_BUILD_TRANSACTION),
  switchMap(async (action) => {
    try {
      const to = action.payload.to;
      const from = action.payload.from;
      const value = action.payload.value;
      const signature = action.payload.signature;

      const ethereum = new Ethereum();
      const result = await ethereum.buildTxSinature(signature, from, to, value);
      return ethereumActions.buildTransactionSuccess(result, action.meta.uid, action.meta.sourceUUID);
    } catch (error) {
      return ethereumActions.buildTransactionFailure(error, action.meta.uid, action.meta.sourceUUID);
    }
  }),
);

const etheriumPublishTransactionEpic: Epic<AnyAction> = (action$, state$) => action$.pipe( // @todo fix action type
  ofType(constants.ETHEREUM_PUBLISH_TRANSACTION),
  switchMap(async (action) => {
    try {
      const transaction = action.payload.transaction;

      const ethereum = new Ethereum();
      const result = await ethereum.sendSignedTransaction(transaction);
      return ethereumActions.publishTransactionSuccess(result.transactionHash, action.meta.uid, action.meta.sourceUUID);
    } catch (error) {
      return ethereumActions.publishTransactionFailure(error, action.meta.uid, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  etheriumBuildTransactionEpic,
  etheriumPublishTransactionEpic,
);
