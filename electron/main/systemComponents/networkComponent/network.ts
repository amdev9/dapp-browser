import {Apis, BalanceObject, Block, Witness} from 'bitsharesjs-ws';
import { ChainStore } from 'bitsharesjs';

let dynamicGlobal;
let globalWS;

async function getWitnessByID ( id: string ) {
  let result: BalanceObject[];
  let witness: Witness[];

  try {
    witness = await Apis.instance()
      .db_api()
      .exec<Witness[]>('get_witnesses', [
        [id]
      ]);
    result = await Apis.instance()
      .db_api()
      .exec<BalanceObject[]>('get_full_accounts', [
        [witness[0].witness_account], console.log()
      ]);
  } catch ( error ) {
    console.log( error );
  }

  return result[0][1];
}

function getData ( ApiObject: Block ) {
  if ( ApiObject ) {
    return {
      block: {
        blockID: ApiObject.id,
        timestamp: ApiObject.timestamp,
        transactionsCount: ApiObject.transactions.length,
        witnessName: ApiObject.witnessName
      },
      transactions: {}
    };
  }
}

async function getBlock (height = 1000) {
  let block: Block;
  let witness;

  try {
    block = await Apis.instance()
      .db_api()
      .exec<Block>('get_block', [height]);
  } catch ( error ) {
    console.log( error );
    return;
  }

  witness = await getWitnessByID( block.witness );
  block.id = height;
  block.witnessName = witness.lifetime_referrer_name;

  return block;
}

const blocks: Block[] = [];

async function getSerializedData () {
  let block;

  dynamicGlobal = ChainStore.getObject('2.1.0');
  console.log("dynamicGlobal: ", dynamicGlobal);
  globalWS = dynamicGlobal ? dynamicGlobal.toJS() : dynamicGlobal;

  if ( globalWS ) {
    block = await getBlock( globalWS.head_block_number );
    blocks.push( block );
    return getData( block );
  } else {
    return null;
  }
}

class Network {
  private static instance: Network;

  constructor () {
    if ( !Network.instance ) {
      Apis.instance('ws://hawking.array.io:8090/ws', true).init_promise.then(
        (res: object) => {
          ChainStore.init().then(() => {
            ChainStore.subscribe( this.broadcast );
          });
        }
      ).catch();
      Network.instance = this;
    }
    return Network.instance;
  }

  async broadcast () {
    const data = await getSerializedData();
    console.log("broadcast data: ", data);
    //io.emit('network:getBlock', data);
  }
}

new Network();


module.exports = Network;
