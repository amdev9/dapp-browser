import { EventEmitter } from 'events';

type DappEvents = 'openLink' | 'setTrayCounter';

class DappClass {
  dappEventEmitter: EventEmitter;

  constructor() {
    this.dappEventEmitter = new EventEmitter();
  }

  emit(event: DappEvents, ...args: any[]) {
    return this.dappEventEmitter.emit(event, ...args);
  }

  on(event: DappEvents, callback: (...args: any[]) => any) {
    return this.dappEventEmitter.on(event, callback);
  }
}

export default new DappClass();
