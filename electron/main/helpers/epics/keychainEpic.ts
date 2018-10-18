import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import * as path from 'path';

import { getDefaultExecPath, Keychain } from '../Keychain';
import * as keychainActions from '../actions/keychain';
import * as constants from '../constants';

const KEYCHAIN_PATH = path.join(__dirname, "..", "helpers", "Keychain", getDefaultExecPath());
console.log("KEYCHAIN_PATH: ", KEYCHAIN_PATH);
console.log("__dirname: ", __dirname);

const keychainCreateEpic: Epic<AnyAction> = action$ => action$.pipe( //@todo fix action type
  ofType(constants.KEYCHAIN_CREATE),
  switchMap(async (action) => {
    try {
      const key = "some_key";
      const cipher = Keychain.Cipher.AES256;
      const curve = Keychain.Curve.SECP256K1;
      const keychainInstance = new Keychain(KEYCHAIN_PATH);

      const result = await keychainInstance.create(key, cipher, curve);
      console.log("Keychain Create result: ", result);
      return keychainActions.createSuccess(result, action.meta.sourceUUID)
    } catch(error){
      return keychainActions.createFailure(error, action.meta.sourceUUID)
    }
  }),
);

const keychainListEpic: Epic<AnyAction> = action$ => action$.pipe( //@todo fix action type
  ofType(constants.KEYCHAIN_LIST),
  switchMap(async (action) => {
    try {
      const keychainInstance = new Keychain(KEYCHAIN_PATH);

      const result = await keychainInstance.list();
      console.log("Keychain list epic result: ", result);
      return keychainActions.listSuccess(result, action.meta.sourceUUID)
    } catch(error){
      return keychainActions.listFailure(error, action.meta.sourceUUID)
    }
  }),
);

const keychainSignEpic: Epic<AnyAction> = action$ => action$.pipe( //@todo fix action type
  ofType(constants.KEYCHAIN_SIGN),
  switchMap(async (action) => {
    try {
      const key = "some_key";
      const chainId = "de5f4d8974715e20f47c8bb609547c9e66b0b9e31d521199b3d8d6af6da74cb1";
      const transaction = "871689d060721b5cec5a010080841e00000000000011130065cd1d0000000000000000";
      const keychainInstance = new Keychain(KEYCHAIN_PATH);

      const result = await keychainInstance.sign(key, chainId, transaction);
      console.log("Keychain sign result: ", result);
      return keychainActions.signSuccess(action.meta.sourceUUID);
    } catch(error){
      return keychainActions.signFailure(error, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  keychainCreateEpic,
  keychainListEpic,
  keychainSignEpic,
);
