import {
  SWITCH_DAPP,
  ADD_APP_ITEM,
  TOGGLE_HOME,
  TOGGLE_APP_HOME
} from '../constants';

const SET_TRAY_PROGRESS = "SET_TRAY_PROGRESS"; // todo cannot import these constants from ../constants for some reason, getting undefined for the new variables
const SET_TRAY_COUNTER = "SET_TRAY_COUNTER";

import { TrayAction } from '../actions/tray';
import { Tray } from './state';

const initialState: Tray = {
  items: [],
  activeDapp: {
    appName: null
  },
  pinned: [],
  isHome: true
}

export default function tray(state: Tray = initialState, action: TrayAction) {
  switch (action.type) {
    case SWITCH_DAPP:

      const dappName = action.payload.targetDappName;
      const newItems = state.items.map((item) => {
        if ((item.appName != dappName) && item.statusIcon.includes('active')) {
          return {
            ...item,
            statusIcon: item.statusIcon.filter(status => status !== 'active')
          }
        } else if (item.appName == dappName && !item.statusIcon.includes('active')) {
          return {
            ...item,
            statusIcon: item.statusIcon.concat(['active'])
          }
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
      }

    case ADD_APP_ITEM:
      const appItem = action.payload.item;

      return {
        ...state,
        items: state.items.filter(item => item.appName == appItem.appName).length == 0 ?
          state.items.concat(appItem) :
          state.items
      }

    case TOGGLE_HOME:
      const isHome = action.payload.isHome;
      const cleanItems = state.items.map((item) => {
        if (item.statusIcon.includes('active')) {
          return {
            ...item,
            statusIcon: item.statusIcon.filter(status => status !== 'active')
          }
        } else {
          return item;
        }
      });

      return {
        ...state,
        isHome: isHome,
        activeDapp: {
          appName: null
        },
        items: cleanItems
      };

    case TOGGLE_APP_HOME:
      return {
        ...state,
        isHome: false,
        activeDapp: {
          appName: action.payload.dappName
        }
      }

    case SET_TRAY_PROGRESS: {
      const dappName = action.payload.targetDappName;
      const indicator = action.payload.indicator;
      const newItems = state.items.map(item => {
        if (item.appName === dappName) {
          return {
            ...item,
            indicator
          }
        } else {
          return item;
        }
      });

      return {
        ...state,
        items: newItems
      }
    }

    case SET_TRAY_COUNTER: {
      const dappName = action.payload.targetDappName;
      const counter = action.payload.counter;
      const newItems = state.items.map((item) => {
        if (item.appName === dappName) {
          return {
            ...item,
            counter
          }
        } else {
          return item;
        }
      });

      return {
        ...state,
        items: newItems
      }
    }

    default:
      return state;
  }
}
