import { ChainStore } from 'bitsharesjs';
import { Apis, Block } from 'bitsharesjs-ws';
import { Store } from 'redux';
import { IState } from './reducers/state';
import * as constants from './constants';

const DEFAULT_BLOCKCHAIN_URI = 'ws://hawking.array.io:8090/ws';

function normalize(height: number, block: Block, witness: string): NetworkAPI.Enriched {
  return {
    transactions: {

    },
    block: {
      transactionsCount: block.transactions.length,
      timestamp: block.timestamp,
      witnessName: witness,
      blockID: height,
    },
  };
}

export class NetworkAPI {
  dynamicGlobal: any;
  blocks: Block[];
  static store: Store<IState>;
  uri: string;
  apis: any;
  ws: any;
  static subscribers: string[] = [];

  constructor(store?: Store<IState>, uri?: string) {
    this.uri = uri ? uri : DEFAULT_BLOCKCHAIN_URI;
    if (store) {
      NetworkAPI.store = store;
    }
    this.blocks = [];

    this.updateGlobal = this.updateGlobal.bind(this);
    this.getDataBlock = this.getDataBlock.bind(this);
    this.broadcast = this.broadcast.bind(this);
  }

  private updateGlobal() {
    this.dynamicGlobal = ChainStore.getObject('2.1.0');
    this.ws = this.dynamicGlobal ? this.dynamicGlobal.toJS() : this.dynamicGlobal;
  }

  async init() {
    await Apis.instance('ws://hawking.array.io:8090/ws', true).init_promise
      .then(response => ChainStore.init());
  }

  async close() {
    await Apis.close();
  }

  async getWitness(id: string): Promise<string> {
    const witness = await Apis.instance()
      .db_api()
      .exec('get_witnesses', [
        [id],
      ]);

    const accounts = await Apis.instance()
      .db_api()
      .exec('get_full_accounts', [
        [witness[0].witness_account], function () {},
      ]);

    const witnessId = accounts[0][0];
    return witnessId;
  }

  async getBlock(height = 1000): Promise<any> {
    const block = await Apis.instance()
      .db_api()
      .exec('get_block', [height]);

    const witness = await this.getWitness(block.witness);
    return normalize(height, block, witness);
  }

  private async getDataBlock(): Promise<NetworkAPI.Enriched> {
    this.updateGlobal();

    if (this.ws) {
      const block = await this.getBlock(this.ws.head_block_number);
      this.blocks.push(block);
      return block;
    } else {
      throw new Error('ws connection was broken');
    }
  }

  private async broadcast() {
    try {
      const broadcastBlock = await this.getDataBlock();
      NetworkAPI.subscribers.forEach((dapp) => {
        NetworkAPI.store.dispatch({ type: constants.NETWORK_BLOCK_CREATED, payload: { block: JSON.stringify(broadcastBlock) }, meta: { targetUUID: dapp } });
      });
    } catch (error) {}
  }

  addSubscriber(uuid: string) {
    if (NetworkAPI.subscribers.includes(uuid)) {
      return;
    }
    NetworkAPI.subscribers.push(uuid);
    if (NetworkAPI.subscribers.length === 1) { // after the first subscriber added, run broadcast method
      ChainStore.subscribe(this.broadcast);
    }
  }

  removeSubscriber(uuid: string) {
    const index = NetworkAPI.subscribers.indexOf(uuid);
    if (index > -1) {
      NetworkAPI.subscribers.splice(index, 1);
      if (NetworkAPI.subscribers.length === 0) { // if there is no more subscribers, stop broadcast method
        ChainStore.unsubscribe(this.broadcast);
      }
    }
  }

  removeAllSubscribers() {
    NetworkAPI.subscribers = [];
    ChainStore.unsubscribe(this.broadcast);
  }
}

export namespace NetworkAPI {
  export type Listener = (updateObject: Enriched) => void;

  export interface Enriched {
    block: {
      transactionsCount: number;
      blockID: string|number;
      witnessName: string;
      timestamp: string;
    };

    transactions: {
      [key: string]: any,
    };
  }
}
