import { TrayAction } from '../actions/tray';
import { Feed } from './state';

const initialState: Feed = {
  items: []
};

export default function feed(state: Feed = initialState, action: TrayAction) {
  switch (action.type) {
    // case ACTION:

    default:
      return state;
  }
}
