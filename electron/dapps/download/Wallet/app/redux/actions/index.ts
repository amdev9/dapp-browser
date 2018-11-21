import { action } from 'typesafe-actions';

import * as constants from '../constants';

export const onSubmitMainFormThunk = (amount: string) => async (dispatch: any) => {
  // dispatch(keychainSign());
};

export const initApp = () => action(constants.INIT_APP);

// export const keychainSign = () => action(constants.KEYCHAIN_SIGN);
