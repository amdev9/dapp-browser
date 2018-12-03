import { Action } from 'redux';
import * as constants from '../../../client/redux/constants';

interface TrayAction extends Action {
  payload?: {
    item?: AppItem,
    targetDappName?: string,
    counter?: number,
  };
}

interface AppItem {
  appName: string;
  icon: string;
  statusIcon: string[];
  counter?: number;
  indicator?: number;
  pin?: boolean;
}

export function tray(state: { items: AppItem[] } = { items: [] }, action: TrayAction) {
  switch (action.type) {
    case constants.ADD_APP_ITEM:
      const appItem = action.payload.item;

      return {
        ...state,
        items: state.items.filter(item => item.appName === appItem.appName).length === 0 ?
          state.items.concat(appItem) :
          state.items,
      };

    case constants.REMOVE_TRAY_ITEM:
      const dappName = action.payload.targetDappName;
      return {
        ...state,
        items: state.items.filter(item => item.appName !== dappName),
      };

    case constants.SET_MAIN_TRAY_COUNTER:

      return {
        ...state,
        items: state.items.map((item) => {
          if (item.appName === action.payload.targetDappName) {
            return {
              ...item,
              counter: action.payload.counter,
            };
          }

          return item;
        }),
      };

    default:
      return state;
  }
}
