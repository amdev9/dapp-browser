import { ActionType } from 'typesafe-actions';
import * as constants from '../constants';
import * as trayActions from '../actions/tray';
import { Tray } from './state';

export type TrayAction = ActionType<typeof trayActions>;

// const initialState: Tray = {
//   items: [],
//   activeDapp: {
//     appName: null
//   },
//   pinned: [],
//   isHome: true
// }

const cleanItems = (state: Tray) => {
  return state.items.map((item) => {
    if (item.statusIcon.includes('active')) {
      return {
        ...item,
        statusIcon: item.statusIcon.filter(status => status !== 'active'),
      };
    } else {
      return item;
    }
  });
};

export default function tray(state: Tray = null, action: TrayAction) {
  switch (action.type) {
    case constants.SWITCH_DAPP:

      const dappName = action.payload.targetDappName;
      const newItems = state.items.map((item) => {
        if ((item.appName != dappName) && item.statusIcon.includes('active')) {
          return {
            ...item,
            statusIcon: item.statusIcon.filter(status => status !== 'active')
          };
        } else if (item.appName == dappName && !item.statusIcon.includes('active')) {
          return {
            ...item,
            statusIcon: item.statusIcon.concat(['active'])
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        items: newItems,
        isHome: false,
        activeDapp: {
          appName: dappName
        }
      };

    case constants.ADD_APP_ITEM:
      const appItem = action.payload.item;

      return {
        ...state,
        items: state.items.filter(item => item.appName == appItem.appName).length == 0 ?
          state.items.concat(appItem) :
          state.items
      };

    case constants.TOGGLE_HOME:
      const isHome = action.payload.isHome;

      return {
        ...state,
        isHome,
        activeDapp: {
          appName: null,
        },
        items: cleanItems(state),
      };

    case constants.TOGGLE_SETTINGS_PANEL:
      return {
        ...state,
        isHome: false,
        activeDapp: {
          appName: null,
        },
        items: cleanItems(state),
      };

    case constants.TOGGLE_APP_HOME:

      return {
        ...state,
        isHome: false,
        activeDapp: {
          appName: action.payload.targetDappName,
        },
      };

    case constants.REMOVE_TRAY_ITEM: {
      const dappName = action.payload.targetDappName;
      return {
        ...state,
        items: state.items.filter(item => item.appName !== dappName),
      };
    }

    case constants.SET_TRAY_PROGRESS: {
      const dappName = action.payload.targetDappName;
      const indicator = action.payload.indicator;
      const newItems = state.items.map(item => {
        if (item.appName === dappName) {
          return {
            ...item,
            indicator
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        items: newItems
      };
    }

    case constants.SET_TRAY_COUNTER: {
      const dappName = action.payload.targetDappName;
      const counter = action.payload.counter;
      const newItems = state.items.map((item) => {
        if (item.appName === dappName) {
          return {
            ...item,
            counter
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        items: newItems
      };
    }

    default:
      return state;
  }
}
