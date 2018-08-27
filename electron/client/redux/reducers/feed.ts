import { SWITCH_DAPP, ADD_APP_ITEM, TOGGLE_HOME, TOGGLE_APP_HOME } from '../constants';
import { TrayAction } from '../actions/tray';
import { Feed } from './state';

const initialState: Feed = {
  items: [{
    preview: require("../assets/app-images/thumb.png"),
    icon: require("../assets/app-icons/exchange.svg"),
    categories: ["games", "tools"],
    name: "exampleDapp",
  },  {
    preview: require("../assets/app-images/thumb.png"),
    icon: require("../assets/app-icons/exchange.svg"),
    categories: ["games", "tools"],
    name: "exampleDapp2",
  }]
}
 
export default function feed(state: Feed = initialState, action: TrayAction) {
  switch (action.type) {
    // case ACTION:
    
    default:
      return state;
  }
}
