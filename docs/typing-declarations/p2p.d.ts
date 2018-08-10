import * as IPFS from 'ipfs'

export namespace Types {
  export enum Message {
    Text,
    Json,
    Blob,
    File,
  }

  export enum Event {
    Subscribed,
    Message,
    Join,
    Left,
  }

  export interface IEvent {
    type: Event;
    data: any;
  }
}

export abstract class Message {
  // Create new generic message: with auto serialize/deserialize
  constructor(type: Types.Message, data: any);
  // Current message type
  type(): Types.Message;
  // Validation data
  valid(): boolean;
  // Get message data by type (auto desirealized)
  payload(): any;
}

export abstract class Room<T> {
  // Listeners by event type
  on(type: Types.Event, callback: (event: Types.IEvent) => void): void;
  // Send message to peer
  send(peerId: IPFS.PeerId, message: Message): void;
  // Broadcast message for all
  send(message: Message): void;
  // Room address
  addr(): IPFS.Multiaddr;
  // List of peers in room
  peers(): IPFS.PeerId[];
  // Room is active connected
  active(): boolean;
  // Leave from room
  leave(): boolean;
  // Room name
  name(): string;
}

export abstract class P2P {
  // Connect to exists room in ipfs
  connectRoom<T>(addr: IPFS.Multiaddr): Room<T>;
  // Get local rooms of this
  getRoom<T>(name: string): Room<T>;
  // Create new room (and add to local rooms list)
  addRoom<T>(name: string): Room<T>;
}

