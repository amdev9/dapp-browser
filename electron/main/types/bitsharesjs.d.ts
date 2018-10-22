declare module "bitsharesjs" {
    export class ChainStore {
        static getObject(id: any, force?: boolean, autosubscribe?: boolean, no_full_account?: boolean): any;
        static subscribe(cb: (updateObject: any) => void):void;
        static init(): Promise<any>;
    }
} 

declare module "bitsharesjs-ws" {
    export interface Block {
        previous: string,
        timestamp: string,
        witness: string,
        transaction_merkle_root: string,
        extensions: string[],
        witness_signature: string,
        transactions: string[]
    }

    export interface Witness {
        witness_account: number;
    }

    export interface Account {
        vesting_balances: any[],
        statistics: any[],
        account: any[],
        proposals: any[],
        withdraws: any[],
        balances: any[],
        assets: any[],
        votes: any[],
    }

    interface ApisInstance {
        init_promise: Promise<any>;
        
        db_api(): {
            exec(method: "get_witnesses", ids: Array<string[]>): Promise<Witness[]>;
            exec(method: "get_block", ids: Array<string|number>): Promise<Block>;
            exec(method: "get_full_accounts", ids: any[]): Promise<[
                [string, Account[]] // (witness, account) 
            ]>;
        }

    }
    
    export class Apis {
        static instance(uri?: string, connect?: boolean): ApisInstance;
        static close(): Promise<void>;
    }
}
