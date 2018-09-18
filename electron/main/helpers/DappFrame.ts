import {Client} from "./reducers/state";

export class DappFrame {
  _state: Client;
  searchOffset = 270; //Math.round((state.window.height - offset) / 2);

  constructor(state: Client) {
    this._state = state;
  }

  get width() {
    let offset = 70;
    if (this._state.notification.isOpen) {
      offset += 300;
    } else if (this._state.loader.isOpen) {
      offset += 300;
    }
    return this._state.window.width - offset;
  };

  get height() {
    // if (storeState.client.settings.isOpen) {
    //   return 0;
    // }
    let offset = 110;
    if (this._state.statusBar.isOpen) {
      offset += 250;
    }
    if (this._state.statusBar.isPeersOpen) {  //@todo account items.count . Now this functions works correctly only for 3 items
      offset += 100
    }
    if (this._state.search.isOpen) {
      offset += this.searchOffset;
    }

    return this._state.window.height - offset;
  };

  get x() {
    return 70;
  };

  get y() {
    let y = 60;
    if (this._state.search.isOpen) {
      y += this.searchOffset;
    }
    return y;
  };

}

