import NetworkSystem from '../systemComponents/src/networkComponent/network'

export class Network {

  async getBlock() {
    const network = new NetworkSystem();
    const block = network.broadcast();
    console.log("Network getBlock: ", block);
    return block;
  }

}

