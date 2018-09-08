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
    let offset = 60;
    if (storeState.client.statusBar.isOpen) { //@todo account items.count . Now this functions works correctly only for 3 items
      offset += 150;
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
