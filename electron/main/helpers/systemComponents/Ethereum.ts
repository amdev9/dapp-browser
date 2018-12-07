const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');
const ethUtil = require('ethereumjs-util');
const rlp = require('rlp');

interface SendTransactionResult {
  transactionHash: string;
}

export class Ethereum {
  endpoint = 'https://ropsten.infura.io/v3/6e07edb991d64b9197996b7ff174de42';
  buffer: Buffer;

  async sendSignedTransaction(rawHex: string): Promise<SendTransactionResult> {
    const web3 = new Web3(new Web3.providers.HttpProvider(this.endpoint)); // todo instantiate web3 in the constructor ?
    return await web3.eth.sendSignedTransaction(`0x${rawHex}`);
  }

  async buildTxSinature (signature: string, from: string, to: string, value: number, data = '') {
    console.log('buildTxSinature');
    const publicKey = `0x${from}`;
    const fromAddress = ethUtil.publicToAddress(publicKey).toString('hex');

    const web3 = new Web3(new Web3.providers.HttpProvider(this.endpoint));
    const nonce = await web3.eth.getTransactionCount(fromAddress);
    const gasPrice = await web3.eth.getGasPrice().then((wei: number) => Number(wei));
    const chainId = 3;

    const draftTxParams = {
      nonce,
      gasPrice,
      to,
      value,
      data,
      // EIP 155 chainId - mainnet: 1, ropsten: 3, rinkeby: 4
      chainId,
    };

    const gasLimit = 21000; // await web3.eth.estimateGas(draftTxParams) ||

    let txParams: any = {
      ...draftTxParams,
      gasLimit,
    };

    if (signature) {
      const ret = this.rsv(signature, chainId);
      txParams = { ...txParams,
        ...ret,
      };
    }

    console.log('tx KeyChain params', txParams);

    class EthereumTxKeychain extends EthereumTx {
      constructor(txParams: any) {
        super(txParams);
      }

      hash(includeSignature: boolean) {
        if (includeSignature === undefined) includeSignature = true;

        // EIP155 spec:
        // when computing the hash of a transaction for purposes of signing or recovering,
        // instead of hashing only the first six elements (ie. nonce, gasprice, startgas, to, value, data),
        // hash nine elements, with v replaced by CHAIN_ID, r = 0 and s = 0

        let items;
        if (includeSignature) {
          items = this.raw;
        } else {
          if (this._chainId > 0) {
            const raw = this.raw.slice();
            this.v = this._chainId;
            this.r = 0;
            this.s = 0;
            items = this.raw;
            this.raw = raw;
          } else {
            items = this.raw.slice(0, 6);
          }
        }
        console.log('items: ', items);
        // create hash
        return rlp.encode(items);
      }
    }

    const tx = new EthereumTxKeychain(txParams);
    if (signature) {
      this.buffer = tx.serialize();
    } else {
      this.buffer = tx.hash(false);
    }

    const hex = this.buffer.toString('hex');

    console.log('final hex: ', hex);
    return hex;
  }

  rsv(signature: string, chainId: number) {
    const r = `0x${signature.slice(0, 64)}`;
    const s = `0x${signature.slice(64, 128)}`;
    const recovery = parseInt(signature.slice(128, 130), 16);
    let tmpV = recovery + 27;
    if (chainId > 0) {
      tmpV += chainId * 2 + 8;
    }
    const v = tmpV;
    return { r, s, v };
  }
}
