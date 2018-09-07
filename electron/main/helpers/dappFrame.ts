export default {
  getWidth: (storeState: any) => {
    let offset = 73;
    if (storeState.client.notification.isOpen ) {
       offset += 300;
    } else if ( storeState.client.loader.isOpen ) {
       offset += 300;
    }
    return storeState.client.window.width - offset;
  },

  getHeight: (storeState: any) => {
    let offset = 63;
    if (storeState.client.statusBar.isOpen) { //@todo account items.count . Now this functions works correctly only for 3 items
      offset += 153;
    }
    return storeState.client.window.height - offset;
  },

  getX: () => {
    return 72;
  },

  getY: () => {
    return 61;
  }

}
