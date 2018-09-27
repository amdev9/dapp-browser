import { CLOSE_MANAGER, TOGGLE_PERMISSION } from '../constants';
import { TrayAction } from '../actions/permission';
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
    case TOGGLE_PERMISSION:
    case CLOSE_MANAGER:

      return state;

    default:
      return state;
  }
}
