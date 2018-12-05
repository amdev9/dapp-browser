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
      const keychainInstance = new Keychain(KEYCHAIN_PATH);

      const ethereum = new Ethereum();
      const from = await keychainInstance.publicKey(key);

      const result: string = await ethereum.buildTxSinature(null, from, to, value);
      return ethereumActions.buildTransactionSuccess(result, action.meta.uid, action.meta.sourceUUID);
    } catch (error) {
      return ethereumActions.buildTransactionFailure(error, action.meta.uid, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  etheriumBuildTransactionEpic,
);
