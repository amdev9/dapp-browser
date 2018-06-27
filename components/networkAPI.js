const Apis = require('bitsharesjs-ws').Apis;
const {
  ChainStore
} = require('bitsharesjs');
const Facade = require('./global');

let dynamicGlobal;
let globalWS;


async function getWitnessByID(id) {
  let result;
  let witness;
  let trans;
  try {
    witness = await Apis.instance()
      .db_api()
      .exec('get_witnesses', [
        [id]
      ]);
    result = await Apis.instance()
      .db_api()
      .exec('get_full_accounts', [
        [witness[0].witness_account], console.log()
      ]);
  } catch (error) {
    console.log(error);
  }
  return result[0][1];
}

function getData(ApiObject) {
  if (ApiObject) {
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

async function getBlock(height = 1000) {
  let block;
  let witness;
  try {
    block = await Apis.instance()
      .db_api()
      .exec('get_block', [height]);
  } catch (error) {
    console.log(error);
    return;
  }
  witness = await getWitnessByID(block.witness);
  block.id = height;
  block.witnessName = witness.lifetime_referrer_name;
  return block;
}

const blocks = [];

async function getSerializedData() {
  let block;
  dynamicGlobal = ChainStore.getObject('2.1.0');
  globalWS = dynamicGlobal ? dynamicGlobal.toJS() : dynamicGlobal;
  if (globalWS) {
    block = await getBlock(globalWS.head_block_number);
    blocks.push(block);
    return getData(block);
  } else {
    return null;
  }
}



class NetworkAPI {
  constructor() {
    if (!NetworkAPI.instance) {
      Apis.instance('ws://hawking.array.io:8090/ws', true).init_promise.then(
        res => {
          ChainStore.init().then(() => {
            ChainStore.subscribe(this.broadcast);
          });
        }
      ).catch();
      NetworkAPI.instance = this;
    }
    return NetworkAPI.instance;
  }

  async broadcast(updateObject) {
    const data = await getSerializedData();
    Facade.io().emit('network:getBlock', data);
  }
}

module.exports = NetworkAPI