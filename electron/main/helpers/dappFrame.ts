//@todo rewrite this module as a Class so that no need to pass state in every method

import {Client} from "./reducers/state";

const searchOffset = 270; //Math.round((state.window.height - offset) / 2);

const getWidth = (state: Client) => {
  let offset = 70;
  if (state.notification.isOpen ) {
    offset += 300;
  } else if ( state.loader.isOpen ) {
    offset += 300;
  }
  return state.window.width - offset;
};

const getHeight = (state: Client) => {
  // if (storeState.client.settings.isOpen) {
  //   return 0;
  // }
  let offset = 110;
  if (state.statusBar.isOpen) {
    offset += 250;
  }
  if (state.statusBar.isPeersOpen) {  //@todo account items.count . Now this functions works correctly only for 3 items
    offset += 100
  }
  if (state.search.isOpen) {
    offset += searchOffset;
  }

  return state.window.height - offset;
};

const getX = () => {
  return 70;
};

const getY = (state: Client) => {
  let y = 60;
  if (state.search.isOpen) {
    y += searchOffset;
  }
  return y;
};

export default {
   getWidth,
   getHeight,
   getX,
   getY
}
