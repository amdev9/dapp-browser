import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import * as path from 'path';

import { Ethereum } from '../systemComponents/Ethereum';
import { getDefaultExecPath, Keychain } from '../systemComponents/Keychain';
import * as ethereumActions from '../actions/ethereum';
import * as constants from '../constants';

const KEYCHAIN_PATH = path.join(__dirname, '..', 'helpers', 'systemComponents', 'Keychain', getDefaultExecPath());

const etheriumBuildTransactionEpic: Epic<AnyAction> = (action$, state$) => action$.pipe( // @todo fix action type
  ofType(constants.ETHEREUM_BUILD_TRANSACTION),
  switchMap(async (action) => {
    try {
      const key = `${state$.value.client.keychain.selectedKey}`; // keys consitsted only of numbers throw 'Bad cast' exception. Converting everythin to string
      const to = action.payload.to;
      const value = action.payload.value;
      let keychainInstance = new Keychain(KEYCHAIN_PATH);

      const ethereum = new Ethereum();
      const from = await keychainInstance.publicKey(key);

      const transaction: string = await ethereum.buildTxSinature(null, from, to, value);
      keychainInstance = new Keychain(KEYCHAIN_PATH); // todo have to instantiate Keychain again because othervise getting error 'stream write after closed'
      const signature: string = await keychainInstance.sign(key, '', transaction);
      const result: string = await ethereum.buildTxSinature(signature, from, to, value);
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
