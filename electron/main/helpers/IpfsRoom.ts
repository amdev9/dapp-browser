import * as IPFS from 'ipfs'
import * as Room from 'ipfs-pubsub-room'

import { remoteConfig } from './config/ipfs'
import Ipfs, { readyState } from './IpfsInstance'
import IpfsBaseComponent from './IpfsBaseComponent'

export type RoomName = string
export type RoomInstance = Room

export interface SubscribeOptions {
  onMessage?: (message: { from: string, data: Buffer }) => void;
  onJoined?: (peer: any) => void;
  onLeft?: (peer: any) => void;
  onSubscribed?: () => void;
}

const rooms: Map<RoomName, Room> = new Map()

// const repo = `ipfs/pubsub-demo/${Math.random()}`


// IpfsBaseComponent.cleanLocks(ipfs.repo.path())

export default class IpfsRoom {
  room: Room

  constructor(room?: Room) {
    this.room = room || null
  }

  static async create(name?: RoomName): Promise<IpfsRoom> {
    if (!name) {
      return new IpfsRoom()
    }

    await readyState

    return new IpfsRoom(Room(Ipfs, name))
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

  async broadcast(message: string) {
    if (this.room) {
      await readyState

      this.room.broadcast(message)
    }
  }

  sendTo(peer: string, message: string) {
    if (this.room) {
      this.room.sendTo(peer, message)
    }
  }

}
