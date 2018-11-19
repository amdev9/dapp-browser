import { Action } from 'redux';
import { ADD_APP_ITEM, REMOVE_TRAY_ITEM } from '../../../client/redux/constants';

interface TrayAction extends Action {
  payload?: {
    item?: AppItem,
    targetDappName?: string,
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

export function tray(state: {items: AppItem[]} = { items: [] }, action: TrayAction) {
  switch (action.type) {
    case ADD_APP_ITEM:
      const appItem = action.payload.item;

      return {
        ...state,
        items: state.items.filter(item => item.appName === appItem.appName).length === 0 ?
          state.items.concat(appItem) :
          state.items,
      };

    case REMOVE_TRAY_ITEM:
      const dappName = action.payload.targetDappName;
      return {
        ...state,
        items: state.items.filter(item => item.appName !== dappName),
      };

    default:
      return state;
  }
}
