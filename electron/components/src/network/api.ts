import { Apis, Block, Account, Witness } from "bitsharesjs-ws";
import { ChainStore } from "bitsharesjs";

const DEFAULT_BLOCKCHAIN_URI = "ws://hawking.array.io:8090/ws"

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
    listeners: NetworkAPI.Listener[];
    dynamicGlobal: any;
    blocks: Block[];
    uri: string;
    apis: any;
    ws: any;
    
    constructor(uri?: string) {
        this.uri = uri ? uri : DEFAULT_BLOCKCHAIN_URI;
        this.listeners = [];
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
            .then((response) => ChainStore.init());

        ChainStore.subscribe(this.broadcast);
    }

    async getWitness(id: string): Promise<string> {
        let witness = await Apis.instance()
            .db_api()
            .exec("get_witnesses", [
                [id]
            ]);
        
        let accounts = await Apis.instance()
            .db_api()
            .exec("get_full_accounts", [
              [witness[0].witness_account], function () {}
            ]);

        let witness_id = accounts[0][0]; 
        return witness_id;
    }

    async getBlock(height = 1000): Promise<any> {
        let block = await Apis.instance()
            .db_api()
            .exec("get_block", [ height ]);

        let witness = await this.getWitness(block.witness);
        return normalize(height, block, witness);
    }


    private async getDataBlock(): Promise<NetworkAPI.Enriched> {
        this.updateGlobal();

        if (this.ws) {
            let block = await this.getBlock(this.ws.head_block_number);
            this.blocks.push(block);
            return block;
        } else {
            throw new Error("ws conenction was broken")
        }
    }

    private async broadcast(updateObject: any) {
        try {
            let broadcast_block = await this.getDataBlock();
            this.listeners.forEach(cb => cb(broadcast_block))
        } catch (error) {}
    }

    addListener(listener: NetworkAPI.Listener) {
        this.listeners.push(listener);
    }

    removeListener(listener: NetworkAPI.Listener) {
        this.listeners = this.listeners
            .filter((entry) => (entry != listener));
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
            [key:string]: any
        };
    }
}