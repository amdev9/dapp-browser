import * as uuid from 'uuid/v4';
import { EventEmitter } from 'events';
import { IpfsRoom, NotificationEvents, NotificationOptions } from '../../types/array-io';
import { selectRoom } from '../redux/thunks';

const ArrayIO = require('array-io');

const ON_JOIN_USER_MESSAGE = 'User has joined';
const ON_LEFT_USER_MESSAGE = 'User has left';

export type Message = {
  from: string;
  message: string;
  own: boolean;
};

export type RoomNotification = {
  removeNotification: () => void;
};

export type RoomComponentEvent = 'message';

export class RoomComponent {
  id: string;
  roomName: string;
  chatInstance: IpfsRoom;
  messages: Message[] = [];
  peerId: string;
  private eventEmitter: EventEmitter = new EventEmitter();
  private notifications: RoomNotification[] = [];

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
        roomComponent.peerId = peerId;
      },
      onMessage: (message) => {
        roomComponent.receiveMessage(message);
      },
      onLeft: (peer) => {
        roomComponent.receiveMessage({ from: peer, data: ON_LEFT_USER_MESSAGE });
      },
      onJoined: (peer) => {
        roomComponent.receiveMessage({ from: peer, data: ON_JOIN_USER_MESSAGE });
      },
    });

    return roomComponent;
  }

  async sendMessageBroadcast(message: string) {
    if (this.chatInstance) {
      await this.chatInstance.sendMessageBroadcast(message);
    }
  }

  async leave() {
    await this.chatInstance.leave();
    this.removeAllNotifications();
  }

  showNotification(options: NotificationOptions, events: NotificationEvents) {
    const removeNotification = ArrayIO.Notification.showNotification(options, events);

    this.notifications.push({ removeNotification });
  }

  removeAllNotifications() {
    this.notifications.forEach((notification) => notification.removeNotification());

    this.notifications = [];
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
    const { roomList } = RoomComponentStore;
    roomList.splice(roomList.findIndex((room) => room.id === roomId), 1);
  }
}
