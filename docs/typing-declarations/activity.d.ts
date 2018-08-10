type ListenerId = string;
type Receiver = string;

export interface Params {
  name: string;
  type: string;
}

export interface Subscriber {
  send(message: any): Promise<boolean>;
  receiver: Receiver;
  params: Params[];
}

export abstract class ServiceSubscribe {
  name: string;

  addListener(listener: (message: any) => any): ListenerId;
  removeListener(listener: ListenerId): boolean;
}

export abstract class ServiceBroadcaster {
  name: string;

  subscribeTo(receiver: Receiver, handler: (subscriber: Subscriber) => void): Promise<boolean>;
  sendTo(receiver: Receiver, message: any): Promise<boolean>;
}

export abstract class Activity {
  registerStaticMethod(name: string, handler: (...arguments: any[]) => Promise<any>): Promise<boolean>;
  registerBroadcastMethod(name: string, handler: (subscriber: Subscriber) => void): Promise<boolean>;
  registerBroadcastMethod(name: string): ServiceBroadcaster;

  getCallableMethod(service_name: string): Promise<(...args: any[]) => any>;
  subscribeToService(service_name: string, ...arguments: any[]): Promise<ServiceSubscribe>;
}