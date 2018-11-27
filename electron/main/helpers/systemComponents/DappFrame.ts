import { Client } from '../reducers/state';
import Rectangle = Electron.Rectangle;

interface WindowBounds {
  width: number;
  height: number;
}

export class DappFrame {
  reduxState: Client;
  windowBounds: WindowBounds;
  searchOffset = 270;

  private static adjustElectronWindowBounds(windowBounds: Rectangle) {
    return { width: windowBounds.width, height: windowBounds.height - 25 };
  }

  constructor(state: Client, windowBoundsRect: Rectangle) {
    this.reduxState = state;
    this.windowBounds = DappFrame.adjustElectronWindowBounds(windowBoundsRect);
  }

  get width() {
    let offset = 70;
    if (this.reduxState.isOpen.notification || this.reduxState.isOpen.loader || this.reduxState.isOpen.keychain) {
      offset += 300;
    }
    return this.windowBounds.width - offset;
  }

  get height() {
    let offset = 110;
    if (this.reduxState.isOpen.statusBar) {
      offset += 250;
    }
    if (this.reduxState.isOpen.statusBarPeers) {
      offset += 100;
    }
    if (this.reduxState.isOpen.search) {
      offset += this.searchOffset;
    }

    return this.windowBounds.height - offset;
  }

  get x() {
    return 70;
  }

  get y() {
    let y = 60;
    if (this.reduxState.isOpen.search) {
      y += this.searchOffset;
    }
    return y;
  }

}
