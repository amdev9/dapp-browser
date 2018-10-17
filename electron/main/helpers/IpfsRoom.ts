import * as IPFS from 'ipfs'
import Room from 'ipfs-pubsub-room'

import { remoteConfig } from './config/ipfs'
import IpfsBaseComponent from './IpfsBaseComponent'

export type RoomName = string
export type RoomInstance = Room

export class IpfsRoom extends IpfsBaseComponent {
  rooms: Map<RoomName, RoomInstance>

  constructor(configuration: IPFS.Options) {
    super(configuration);

    this.rooms = new Map()
  }

  getRoom(name: RoomName): RoomInstance {
    return this.rooms.has(name) && this.rooms.get(name) || null
  }

  async create(name: RoomName = 'ipfs-pubsub-demo') {
    if (!name) {
      return
    }

    if (this.getRoom(name)){
      throw Error('Room is already created')
    }

    await this.readyState

    const room = Room(this.ipfs, name)

    this.rooms.set(name, room)

    return room
  }

}

export default new IpfsRoom(remoteConfig)
