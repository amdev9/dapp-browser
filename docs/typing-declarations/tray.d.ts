// Aka Sidebar
export namespace Tray {
  export enum Type {
    Progress,
    Disabled,
    Button,
    Toggle,
    Title,
  }

  export interface Item {
    onClick?: (context: Item) => void;
    progress?: number,
    enabled?: boolean,
    label: string,
    type: Type,
  }
}

export abstract class Counter {
  constructor(count: number);
  setCount(count: number): void;
}

export abstract class Tray {
  onDrag(handler: (files: any) => void): void;
  setCounter(counter: Counter): void;
  setMenu(menu: Tray.Item[]): void;
}