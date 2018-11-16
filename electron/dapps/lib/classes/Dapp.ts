import { EventEmitter } from 'events';

class DappClass {
  dappEventEmitter: EventEmitter;

  constructor() {
    this.dappEventEmitter = new EventEmitter();
  }

  emit(event: string, ...args: any) {
    return this.dappEventEmitter.emit(event, ...args);
  }

  subscribe(event: string, callback: (error: any, result: any) => any) {
    return this.dappEventEmitter.on(event, callback);
  }
}

export default new DappClass();
