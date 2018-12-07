import * as IPFS from 'ipfs';
import * as Room from 'ipfs-pubsub-room';
import * as path from 'path';
import * as uuid from 'uuid/v4';

import { getReadyIpfsInstance } from '../../helpers/systemComponents/IpfsInstance';
import { appTempPath } from '../../helpers/constants/appPaths';
import { Message } from './models';

export type RoomName = string;
export type DappUUID = string;

export interface SubscribeOptions {
  onMessage?: (message: Message) => void;
  onJoined?: (peer: string) => void;
  onLeft?: (peer: string) => void;
  onSubscribed?: () => void;
}

type DappRooms = { [roomUUID: string]: Component };
type DappMap = { [dappUUID: string]: DappRooms };

class RoomStorage {
  rooms: DappMap;

  constructor() {
    this.rooms = {};
  }

  getRoom(dappUUID: string, roomUUID: string): Component {
    return this.rooms[dappUUID] && this.rooms[dappUUID][roomUUID];
  }

  addRoom(room: Component): void {
    if (!this.rooms[room.dappUUID]) {
      this.rooms[room.dappUUID] = {};
    }
    this.rooms[room.dappUUID][room.id] = room;
  }

  removeRoom(dappUUID: DappUUID, roomUUID: string) {
    delete this.rooms[dappUUID][roomUUID];
  }
}

const RoomMapInstance = new RoomStorage();

export default class Component {
  room: Room;
  dappUUID: string;
  id: string;

  constructor(room: Room, options: { dappUUID: string, roomUUID?: string }) {
    this.room = room || null;
    this.dappUUID = options && options.dappUUID || null;
    this.id = options && options.roomUUID || uuid();
  }

  static async create(dappUUID: string, roomName: string): Promise<Component> {
    const ipfs = await getReadyIpfsInstance({ repo: path.join(appTempPath, 'ipfs-room', 'repos') });

    const getRoomInstance = <any> Room;
    const roomInstance = getRoomInstance(ipfs, roomName);
    console.log('RoomMA', await roomInstance._ipfs.id())

    const room = new Component(roomInstance, { dappUUID });
    RoomMapInstance.addRoom(room);
    return room;
  }

  static get(dappUUID: string, roomUUID: string): Component {
    return RoomMapInstance.getRoom(dappUUID, roomUUID);
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

  getPeers() {
    if (this.room) {
      console.log('peers', this.room.getPeers())
      return this.room.getPeers();
    }
  }

  leave() {
    if (this.room) {
      this.room.leave();
      RoomMapInstance.removeRoom(this.dappUUID, this.id);
    }
  }

}
