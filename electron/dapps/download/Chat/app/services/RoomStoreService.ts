import * as uuid from 'uuid/v4';
import { EventEmitter } from 'events';
import { IpfsRoom } from '../../types/array-io';
import { Room } from "../../../../../../docs/typing-declarations";

const ArrayIO = require('array-io');

const ON_JOIN_USER_MESSAGE = 'User has joined';
const ON_LEFT_USER_MESSAGE = 'User has left';

export interface Message {
  from: string;
  message: string;
  own: boolean;
}

export type RoomComponentEvent = 'message';

export class RoomComponent {
  id: string;
  roomComponentList: RoomComponent[];
  roomName: string;
  chatInstance: IpfsRoom;
  messages: Message[] = [];
  peerId: string;
  eventEmitter: EventEmitter = new EventEmitter();

  constructor(roomName: string, chatInstance: IpfsRoom) {
    this.id = uuid();
    this.roomName = roomName;
    this.chatInstance = chatInstance;
  }

  formatMessage(message: { from: string, data: Buffer | string }) {
    return {
      from: message.from,
      message: message.data.toString(),
      own: message.from === this.peerId,
    };
  }

  receiveMessage(message: { from: string, data: Buffer | string }) {
    const formattedMessage = this.formatMessage(message);

    this.messages = [
      ...this.messages,
      formattedMessage,
    ];

    this.emit('message', formattedMessage);
  }

  emit(event: RoomComponentEvent, ...args: any[]) {
    this.eventEmitter.emit(event, ...args);
  }

  on(event: RoomComponentEvent, callback: (...args: any[]) => void) {
    this.eventEmitter.on(event, callback);
  }

  static async create(roomName: string) {
    const chatInstance: ArrayIO.IpfsRoom = new ArrayIO.IpfsRoom();
    const roomComponent = new RoomComponent(roomName, chatInstance);

    await chatInstance.subscribe(roomName, {
      onSubscribe: (peerId) => {
        console.log('IpfsRoom: my id', peerId);
        roomComponent.peerId = peerId;
      },
      onMessage: (message) => {
        console.log('onMessage', message);
        roomComponent.receiveMessage(message);
      },
      onLeft: (peer) => {
        console.log('onLeft', peer);
        roomComponent.receiveMessage({ from: peer, data: ON_LEFT_USER_MESSAGE });
      },
      onJoined: (peer) => {
        console.log('onJoined', peer);
        roomComponent.receiveMessage({ from: peer, data: ON_JOIN_USER_MESSAGE });
      },
    });

    return roomComponent;
  }

  async sendMessageBroadcast(message: string) {
    console.log('sendmsgbroadcast', this, message);
    if (this.chatInstance) {
      await this.chatInstance.sendMessageBroadcast(message);
    }
  }

  async leave() {
    await this.chatInstance.leave();
  }
}

export class RoomComponentStore {
  static roomList: RoomComponent[] = [];

  static addRoom(room: RoomComponent): void {
    RoomComponentStore.roomList.push(room);
  }

  static getRoomById(roomId: string = ''): RoomComponent | null {
    return RoomComponentStore.roomList.find((room: RoomComponent) => room.id === roomId) || null;
  }
  static getRoomByName(roomName: string = ''): RoomComponent | null {
    return RoomComponentStore.roomList.find((room: RoomComponent) => room.roomName.toLowerCase() === roomName.toLowerCase()) || null;
  }

  static removeRoom(roomId: string): void {
    const { roomList } = RoomComponentStore
    roomList.splice(roomList.findIndex((room) => room.id === roomId), 1)
  }
}
