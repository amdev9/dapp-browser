export default {
  getWidth: (storeState: any) => {
    let offset = 4;
    if (storeState.client.notification.isOpen ) {
       offset += 300;
    }
    // if ( storeState.client.loader.isOpen ) {
    //   offset += 300;
    // }
    return storeState.client.feedSize.width - offset;
  },

  getHeight: (storeState: any) => {
    let offset = 72;
    if (storeState.client.statusBar.isOpen) { //@todo account items.count . Now this functions works correctly only for 3 items
      offset += 153;
    }
    return storeState.client.feedSize.height - offset;
  },

  getX: () => {
    return 72;
  },

  getY: () => {
    return 61;
  }

}
