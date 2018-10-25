import { Action } from 'redux';
import * as constants from "../constants";
import {AppsManager} from "../AppsManager";

export function feed(state = {}, action: Action) {
  switch (action.type) {
    case constants.MARKET_DOWNLOAD_DAPP_SUCCESS:
      return {items: AppsManager.dapps};

    default:
      return state;
  }
}
