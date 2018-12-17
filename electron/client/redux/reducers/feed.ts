import { MARKET_DOWNLOAD_DAPP_SUCCESS } from '../constants';
import * as MainAppsManagerConstants from 'MainApp/modules/AppsManager/constants';
import { Feed } from './state';

// const initialState: Feed = {
//   items: []
// };

export default function feed(state: Feed = null, action: any) { //@todo refactor: fix action type
  switch (action.type) {
    case MainAppsManagerConstants.DAPP_DOWNLOAD_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items,

        ]
      };
    case MainAppsManagerConstants.DAPP_DOWNLOAD_FAILURE:
      return {
        ...state
      };

    default:
      return state;
  }
}
