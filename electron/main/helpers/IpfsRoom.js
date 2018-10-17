"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPFS = require("ipfs");
var ipfs_pubsub_room_1 = require("ipfs-pubsub-room");
var ipfs_1 = require("./config/ipfs");
var IpfsBaseComponent_1 = require("./IpfsBaseComponent");
var rooms = new Map();
var ipfs = new IPFS(ipfs_1.remoteConfig);
var repo = "ipfs/pubsub-demo/" + Math.random();
IpfsBaseComponent_1.default.cleanLocks(repo || ipfs.repo.path());
var IpfsRoom = /** @class */ (function () {
    function IpfsRoom(name) {
        if (!name) {
            return this;
        }
        if (IpfsRoom.getRoomByName(name)) {
            throw Error('Room is already created');
        }
        this.room = ipfs_pubsub_room_1.default(ipfs, name);
        rooms.set(name, this.room);
        return this;
    }
    IpfsRoom.getRoomByName = function (name) {
        if (rooms.has(name)) {
            var ipfsRoom = new IpfsRoom();
            ipfsRoom.setRoom(rooms.get(name));
            return ipfsRoom;
        }
        return null;
    };
    IpfsRoom.prototype.setRoom = function (room) {
        this.room = room;
    };
    IpfsRoom.prototype.subscribe = function (options) {
        if (options === void 0) { options = {}; }
        if (this.room) {
            options.onJoined && this.room.on('peer joined', options.onJoined);
            options.onLeft && this.room.on('peer left', options.onLeft);
            options.onMessage && this.room.on('message', options.onMessage);
        }
    };
    IpfsRoom.prototype.broadcast = function (message) {
        if (this.room) {
            this.room.broadcast(message);
        }
    };
    IpfsRoom.prototype.sendTo = function (peer, message) {
        if (this.room) {
            this.room.sendTo(peer, message);
        }
    };
    return IpfsRoom;
}());
exports.IpfsRoom = IpfsRoom;
exports.default = new IpfsRoom('ipfs-pubsub-demo');
