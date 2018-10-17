"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPFS = require("../types/ipfs");
var ipfs_1 = require("./config/ipfs");
exports.default = new IPFS(ipfs_1.remoteConfig);
