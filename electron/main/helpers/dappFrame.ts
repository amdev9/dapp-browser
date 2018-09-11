export default {
  getWidth: (storeState: any) => {
    let offset = 70;
    if (storeState.client.notification.isOpen ) {
       offset += 300;
    } else if ( storeState.client.loader.isOpen ) {
       offset += 300;
    }
    return storeState.client.window.width - offset;
  },

  getHeight: (storeState: any) => {
    let offset = 110;
    if (storeState.client.statusBar.isOpen) {
      offset += 250;
    }
    if (storeState.client.statusBar.isPeersOpen) {  //@todo account items.count . Now this functions works correctly only for 3 items
      offset += 100
    }
    return storeState.client.window.height - offset;
  },

  getX: () => {
    return 70;
  },

  getY: () => {
    return 60;
  }

}
