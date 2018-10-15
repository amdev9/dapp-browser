declare module "bitsharesjs-ws" {

  export interface Block {
    witness: string
    witnessName: string
    id: number
    timestamp: number;
    transactions: object[];
  }

  export type BalanceObject = Witness[];

  export interface Witness {
    witness_account: string
    lifetime_referrer_name: string
  }

  export interface DbApi {
    exec<T>(method_name: string, params: any): T
  }

  export interface ApisInstance {
    db_api(): DbApi
    init_promise: Promise<object>
  }

  export class Apis {
    static instance(url?: string, param?: boolean): ApisInstance;
  }
}
