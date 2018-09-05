export default {
  getWidthOffset: (storeState: any) => {
    let offset = 70;
    if (storeState.client.notification.isOpen ) {
      offset += 300;
    }
    // if ( storeState.client.loader.isOpen ) {
    //   offset += 300;
    // }
    
    return offset;
  },

  getHeightOffset: (storeState: any) => {
    let offset = 85;
    if (storeState.client.statusBar.isOpen) { //@todo account items.count . Now this functions works correctly only for 3 items
      offset += 153;
    }
    return offset;
  },

  getXOffset: () => {
    return 70;
  },

  getYOffset: () => {
    return 60;
  }

}
