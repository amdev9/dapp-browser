export interface SearchItem {
  network: string
  icon: string
  app: string
  uri: string
}

export interface SuggestItem {
  type: SuggestItem.Type
  item?: SearchItem
  header?: string
}

export namespace SuggestItem {
  export enum Type {
    Header,
    Item,
  }
}

