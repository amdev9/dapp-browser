export default {
  getWidthOffset: (storeState: any) => {
    let offset = 73;
    if (storeState.client.notification.isOpen) {
      offset += 302;
    }
    return offset;
  },

  getHeightOffset: (storeState: any) => {
    let offset = 86;
    if (storeState.client.statusBar.isOpen) { //@todo account items.count . Now this functions works correctly only for 3 items
      offset += 154;
    }
    return offset;
  },

  getXOffset: () => {
    return 73;
  },

  getYOffset: () => {
    return 62;
  }

}
