import * as IPFS from 'ipfs';
import * as Room from 'ipfs-pubsub-room';
import * as path from 'path';
import { getReadyIpfsInstance } from './IpfsInstance';
import { appTempPath } from './constants/appPaths';

export type RoomName = string;
export type DappUUID = string;
export type Message = { from: string, data: Buffer };

export interface SubscribeOptions {
  onMessage?: (message: Message) => void;
  onJoined?: (peer: string) => void;
  onLeft?: (peer: string) => void;
  onSubscribed?: () => void;
}

type DappRooms = { [roomName: string]: Room };
type DappMap = { [dappUUID: string]: DappRooms };

class RoomStorage {
  rooms: DappMap;

  constructor() {
    this.rooms = {};
  }

  getRoom(dappUUID: DappUUID, roomName: RoomName): Room {
    return this.rooms[dappUUID] && this.rooms[dappUUID][roomName];
  }

  addRoom(dappUUID: DappUUID, roomName: RoomName, room: Room): void {
    if (!this.rooms[dappUUID]) {
      this.rooms[dappUUID] = {};
    }
    this.rooms[dappUUID][roomName] = room;
  }

  removeRoom(dappUUID: DappUUID, roomName: RoomName) {
    delete this.rooms[dappUUID][roomName];
  }
}

const RoomMapInstance = new RoomStorage();

export default class IpfsRoom {
  room: Room;
  dappUUID: string;
  roomName: string;

  constructor(room: Room, options: { dappUUID: string, roomName: string }) {
    this.room = room || null;

    this.dappUUID = options && options.dappUUID || null;
    this.roomName = options && options.roomName || null;
  }

  static async create(dappUUID: string, roomName: RoomName): Promise<IpfsRoom> {
    const ipfs = await getReadyIpfsInstance({ repo: path.join(appTempPath, 'ipfs-room', 'repos') });

    const similarRoom = RoomMapInstance.getRoom(dappUUID, roomName);
    
    if (similarRoom) {
      return similarRoom && new IpfsRoom(similarRoom, { dappUUID, roomName });
    }

    const getRoomInstance = <any> Room;
    const room = getRoomInstance(ipfs, roomName);
    RoomMapInstance.addRoom(dappUUID, roomName, room);
    return new IpfsRoom(room, { dappUUID, roomName });
  }

  static get(dappUUID: string, roomName?: RoomName): IpfsRoom {
    const room = RoomMapInstance.getRoom(dappUUID, roomName);
    return room && new IpfsRoom(room, { dappUUID, roomName });
  }

  async getPeerId(): Promise<IPFS.Id> {
    return this.room && this.room._ipfs.id();
  }

  subscribe(options: SubscribeOptions = {}): void {
    if (this.room) {
      options.onJoined && this.room.on('peer joined', options.onJoined);
      options.onLeft && this.room.on('peer left', options.onLeft);
      options.onMessage && this.room.on('message', options.onMessage);
      options.onSubscribed && this.room.on('subscribed', options.onSubscribed);
    }
  }

  async broadcast(message: string | Buffer) {
    if (this.room) {
      this.room.broadcast(message);
    }
  }

  sendTo(peer: string, message: string | Buffer) {
    if (this.room) {
      this.room.sendTo(peer, message);
    }
  }

  leave() {
    if (this.room) {
      this.room.leave();
      RoomMapInstance.removeRoom(this.dappUUID, this.roomName);
    }
  }

}
