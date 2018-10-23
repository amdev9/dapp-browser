import * as Room from 'ipfs-pubsub-room'

import { remoteConfig } from './config/ipfs'
import { getReadyIpfsInstance }  from './IpfsInstance'
import IpfsBaseComponent from './IpfsBaseComponent'

export type RoomName = string
export type RoomInstance = Room
export type DappUUID = string
export type Message = { from: string, data: Buffer }

export interface SubscribeOptions {
  onMessage?: (message: Message) => void;
  onJoined?: (peer: string) => void;
  onLeft?: (peer: string) => void;
  onSubscribed?: () => void;
}

const rooms: Map<RoomName, Room> = new Map()

type DappRooms = { [roomName:string]: Room }
type DappMap = { [dappUUID:string]: DappRooms }

class RoomStorage {
  rooms: DappMap

  constructor() {
    this.rooms = {}
  }

  getRoom(dappUUID: DappUUID, roomName: RoomName): Room {
    return this.rooms[dappUUID] && this.rooms[dappUUID][roomName]
  }

  addRoom(dappUUID: DappUUID, roomName: RoomName, room: Room): void {
    if (!this.rooms[dappUUID]) {
      this.rooms[dappUUID] = {}
    }


    this.rooms[dappUUID][roomName] = room

    console.log('RoomStorage.addRoom:', dappUUID, roomName, !!room)
    console.log('RoomStorage.rooms:',
      Object.keys(this.rooms).map((key) =>
        `DAPP:${key} - ${Object.keys(this.rooms[key]).join(',')}`).join(' ||| ')
    )

  }
}

const RoomMapInstance = new RoomStorage()

export default class IpfsRoom {
  room: Room

  constructor(room?: Room) {
    this.room = room || null

  }

  static async create(dappUUID: string, name?: RoomName): Promise<IpfsRoom> {
    if (!dappUUID || !name) {
      return new IpfsRoom()
    }

    const ipfs = await getReadyIpfsInstance({ repo: `ipfs-room/repos/${Math.random()}`,})

    const room = Room(ipfs, name)

    RoomMapInstance.addRoom(dappUUID, name, room)

    return new IpfsRoom(room)
  }

  static get(dappUUID: string, name?: RoomName): IpfsRoom {
    const room = RoomMapInstance.getRoom(dappUUID, name)
    return room && new IpfsRoom(room)
  }

  setRoom(room: Room): void {
    this.room = room
  }

  subscribe(options: SubscribeOptions = {}): void {
    if (this.room) {
      options.onJoined && this.room.on('peer joined', options.onJoined)
      options.onLeft && this.room.on('peer left', options.onLeft)
      options.onMessage && this.room.on('message', options.onMessage)
      options.onSubscribed && this.room.on('subscribed', options.onSubscribed)
    }
  }

  async broadcast(message: string | Buffer) {
    if (this.room) {
      this.room.broadcast(message)
    }
  }

  sendTo(peer: string, message: string | Buffer) {
    if (this.room) {
      this.room.sendTo(peer, message)
    }
  }

  leave() {
    if (this.room) {
      this.room.leave()
    }
  }

}
