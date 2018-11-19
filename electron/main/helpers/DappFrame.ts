import { Client } from './reducers/state';
import Rectangle = Electron.Rectangle;

interface WindowBounds {
  width: number;
  height: number;
}

export class DappFrame {
  _state: Client;
  _windowBounds: WindowBounds;
  searchOffset = 270; // Math.round((state.window.height - offset) / 2);

  private static adjustElectronWindowBounds(windowBounds: Rectangle) {
    return { width: windowBounds.width, height: windowBounds.height - 25 };
  }

  constructor(state: Client, windowBounds: Rectangle) {
    this._state = state;
    this._windowBounds = DappFrame.adjustElectronWindowBounds(windowBounds);
  }

  get width() {
    let offset = 70;
    if (this._state.isOpen.notification || this._state.isOpen.loader || this._state.isOpen.keychain) {
      offset += 300;
    }
    return this._windowBounds.width - offset;
  }

  get height() {
    // if (storeState.client.settings.isOpen) {
    //   return 0;
    // }
    let offset = 110;
    if (this._state.isOpen.statusBar) {
      offset += 250;
    }
    if (this._state.isOpen.statusBarPeers) {  // @todo refactor account items.count . Now this functions works correctly only for 3 items
      offset += 100;
    }
    if (this._state.isOpen.search) {
      offset += this.searchOffset;
    }

    return this._windowBounds.height - offset;
  }

  get x() {
    return 70;
  }

  get y() {
    let y = 60;
    if (this._state.isOpen.search) {
      y += this.searchOffset;
    }
    return y;
  }

}
