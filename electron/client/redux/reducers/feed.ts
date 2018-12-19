import * as MainAppsManagerConstants from 'MainApp/modules/AppsManager/constants';
import { Feed } from './state';

export default function feed(state: Feed = null, action: any) { //@todo refactor: fix action type
  switch (action.type) {
    case MainAppsManagerConstants.UPDATE_INSTALLED_DAPPS:
      return {
        ...state,
        items: action.payload.dappsList,
      }

    default:
      return state;
  }
}
