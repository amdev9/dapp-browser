declare module "bitsharesjs" {

  export interface DynamicGlobal {
    toJS(): DynamicGlobal
    head_block_number: number
  }

  export class ChainStore {
    static getObject(id: string): DynamicGlobal
    static init(): Promise<void>
    static subscribe(param: () => Promise<string>): void
  }

}
